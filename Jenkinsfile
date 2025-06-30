pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'ecommerce-nextjs-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        REGISTRY_URL = 'your-registry.com'
        ANSIBLE_INVENTORY = 'inventory/production'
        ANSIBLE_PLAYBOOK = 'deploy.yml'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    // Get git commit info
                    env.GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_BRANCH = sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm ci'
                }
            }
        }
        
        stage('Lint & Type Check') {
            steps {
                script {
                    sh 'npm run lint'
                    sh 'npm run type-check'
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                script {
                    sh 'npm run test:coverage'
                }
            }
        }
        
        //        stage('Integration Tests') {
        //            steps {
        //                script {
        //                    // Start application in container for integration tests
        //                    sh 'docker-compose up -d app'
        //                    sh 'sleep 10' // Wait for app to start
        //                    // Run integration tests
        //                    sh 'npm run test:integration'
        //                    // Cleanup
        //                    sh 'docker-compose down'
        //                }
        //            }
        //        }
        
        stage('Security Scan') {
            steps {
                script {
                    // Run security audit
                    sh 'npm audit --audit-level moderate'
                    
                    // Run container security scan
                    sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v ${WORKSPACE}:/app aquasec/trivy image ${DOCKER_IMAGE}:${DOCKER_TAG}'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                    sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest'
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-registry', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'docker login -u ${DOCKER_USER} -p ${DOCKER_PASS} ${REGISTRY_URL}'
                        sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}'
                        sh 'docker push ${REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}'
                    }
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            export ANSIBLE_HOST_KEY_CHECKING=False
                            ansible-playbook -i ${ANSIBLE_INVENTORY}/staging ${ANSIBLE_PLAYBOOK} \
                                -e "docker_image=${REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}" \
                                -e "environment=staging" \
                                --private-key ${SSH_KEY}
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?'
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'ansible-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                            export ANSIBLE_HOST_KEY_CHECKING=False
                            ansible-playbook -i ${ANSIBLE_INVENTORY}/production ${ANSIBLE_PLAYBOOK} \
                                -e "docker_image=${REGISTRY_URL}/${DOCKER_IMAGE}:${DOCKER_TAG}" \
                                -e "environment=production" \
                                --private-key ${SSH_KEY}
                        '''
                    }
                }
            }
        }
        
        stage('Health Check') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            steps {
                script {
                    def environment = env.GIT_BRANCH == 'main' ? 'production' : 'staging'
                    def url = environment == 'production' ? 'https://app.production.com' : 'https://app.staging.com'
                    
                    sh '''
                        # Wait for deployment to complete
                        sleep 30
                        
                        # Health check
                        for i in {1..10}; do
                            if curl -f ${url}/api/health; then
                                echo "Health check passed"
                                break
                            fi
                            echo "Health check attempt $i failed, retrying..."
                            sleep 10
                        done
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup
            sh 'docker system prune -f'
            
            // Archive artifacts
            archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
        }
        
        success {
            script {
                // Send success notification
                emailext (
                    subject: "Pipeline SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER} completed successfully.
                        
                        Build Details:
                        - Branch: ${env.GIT_BRANCH}
                        - Commit: ${env.GIT_COMMIT}
                        - Build URL: ${env.BUILD_URL}
                        
                        Docker Image: ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
        
        failure {
            script {
                // Send failure notification
                emailext (
                    subject: "Pipeline FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                    body: """
                        Pipeline ${env.JOB_NAME} #${env.BUILD_NUMBER} failed.
                        
                        Build Details:
                        - Branch: ${env.GIT_BRANCH}
                        - Commit: ${env.GIT_COMMIT}
                        - Build URL: ${env.BUILD_URL}
                        
                        Please check the build logs for more details.
                    """,
                    recipientProviders: [[$class: 'DevelopersRecipientProvider']]
                )
            }
        }
    }
} 