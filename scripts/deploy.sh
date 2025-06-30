#!/bin/bash

# E-Commerce Application Deployment Script
# This script can be used for manual deployments or as part of CI/CD

set -e

# Configuration
APP_NAME="ecommerce-nextjs-app"
DOCKER_REGISTRY="your-registry.com"
ENVIRONMENT=${1:-staging}
DOCKER_TAG=${2:-latest}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Check prerequisites
check_prerequisites() {
    log "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed"
    fi
    
    if ! command -v ansible &> /dev/null; then
        error "Ansible is not installed"
    fi
    
    if ! command -v git &> /dev/null; then
        error "Git is not installed"
    fi
    
    log "Prerequisites check passed"
}

# Build Docker image
build_image() {
    log "Building Docker image..."
    
    docker build -t ${APP_NAME}:${DOCKER_TAG} .
    docker tag ${APP_NAME}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${APP_NAME}:${DOCKER_TAG}
    
    log "Docker image built successfully"
}

# Push to registry
push_image() {
    log "Pushing image to registry..."
    
    docker push ${DOCKER_REGISTRY}/${APP_NAME}:${DOCKER_TAG}
    
    log "Image pushed successfully"
}

# Deploy using Ansible
deploy_with_ansible() {
    log "Deploying to ${ENVIRONMENT} environment..."
    
    export ANSIBLE_HOST_KEY_CHECKING=False
    
    ansible-playbook \
        -i ansible/inventory/${ENVIRONMENT} \
        ansible/deploy.yml \
        -e "docker_image=${DOCKER_REGISTRY}/${APP_NAME}:${DOCKER_TAG}" \
        -e "environment=${ENVIRONMENT}" \
        --private-key ~/.ssh/id_rsa
    
    log "Deployment completed successfully"
}

# Health check
health_check() {
    log "Performing health check..."
    
    local url=""
    case $ENVIRONMENT in
        "production")
            url="https://app.production.com/api/health"
            ;;
        "staging")
            url="https://app.staging.com/api/health"
            ;;
        *)
            url="http://localhost:3000/api/health"
            ;;
    esac
    
    # Wait for deployment to complete
    sleep 30
    
    # Perform health check
    for i in {1..10}; do
        if curl -f -s $url > /dev/null; then
            log "Health check passed"
            return 0
        fi
        warn "Health check attempt $i failed, retrying..."
        sleep 10
    done
    
    error "Health check failed after 10 attempts"
}

# Rollback function
rollback() {
    log "Rolling back deployment..."
    
    # Get previous version
    PREVIOUS_TAG=$(docker images ${DOCKER_REGISTRY}/${APP_NAME} --format "table {{.Tag}}" | grep -v TAG | head -2 | tail -1)
    
    if [ -z "$PREVIOUS_TAG" ]; then
        error "No previous version found for rollback"
    fi
    
    log "Rolling back to version: ${PREVIOUS_TAG}"
    
    ansible-playbook \
        -i ansible/inventory/${ENVIRONMENT} \
        ansible/deploy.yml \
        -e "docker_image=${DOCKER_REGISTRY}/${APP_NAME}:${PREVIOUS_TAG}" \
        -e "environment=${ENVIRONMENT}" \
        --private-key ~/.ssh/id_rsa
    
    log "Rollback completed"
}

# Main deployment flow
main() {
    log "Starting deployment process..."
    log "Environment: ${ENVIRONMENT}"
    log "Docker Tag: ${DOCKER_TAG}"
    
    # Check prerequisites
    check_prerequisites
    
    # Build and push image
    build_image
    push_image
    
    # Deploy
    deploy_with_ansible
    
    # Health check
    health_check
    
    log "Deployment completed successfully!"
}

# Handle script arguments
case "${1:-}" in
    "rollback")
        rollback
        ;;
    "health")
        health_check
        ;;
    "build")
        build_image
        ;;
    "push")
        push_image
        ;;
    "deploy")
        deploy_with_ansible
        ;;
    *)
        main
        ;;
esac 