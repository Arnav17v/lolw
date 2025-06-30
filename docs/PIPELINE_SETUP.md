# DevOps Pipeline Setup Guide

This document provides detailed instructions for setting up the complete DevOps CI/CD pipeline for the E-Commerce application.

## Prerequisites

### Required Software
- **Jenkins** 2.387+ with the following plugins:
  - Pipeline
  - Git
  - Docker Pipeline
  - Ansible
  - HTML Publisher
  - Email Extension
  - Credentials Binding
  - SSH Agent
- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Ansible** 2.12+
- **Node.js** 18+
- **Java** 17+
- **Maven** 3.8+
- **Git** 2.30+

### Infrastructure Requirements
- **Jenkins Server**: 4GB RAM, 2 vCPUs, 50GB storage
- **Application Servers**: 8GB RAM, 4 vCPUs, 100GB storage each
- **Database Server**: 16GB RAM, 8 vCPUs, 500GB storage
- **Monitoring Server**: 4GB RAM, 2 vCPUs, 100GB storage

## Jenkins Setup

### 1. Install Jenkins

```bash
# Add Jenkins repository
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'

# Install Jenkins
sudo apt update
sudo apt install jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

### 2. Install Required Plugins

1. Go to **Manage Jenkins** > **Manage Plugins**
2. Install the following plugins:
   - Pipeline
   - Git
   - Docker Pipeline
   - Ansible
   - HTML Publisher
   - Email Extension
   - Credentials Binding
   - SSH Agent
   - Blue Ocean (optional)

### 3. Configure Credentials

1. Go to **Manage Jenkins** > **Manage Credentials**
2. Add the following credentials:

#### Docker Registry Credentials
- **Kind**: Username with password
- **ID**: `docker-registry`
- **Username**: Your registry username
- **Password**: Your registry password

#### SSH Credentials
- **Kind**: SSH Username with private key
- **ID**: `ansible-ssh-key`
- **Username**: `ubuntu`
- **Private Key**: Your SSH private key

#### Email Configuration
- **Kind**: SMTP
- **SMTP Server**: Your SMTP server
- **Username**: Your email username
- **Password**: Your email password

### 4. Configure Jenkins Tools

1. Go to **Manage Jenkins** > **Global Tool Configuration**
2. Configure:
   - **Git**: Install automatically
   - **Docker**: Install automatically
   - **NodeJS**: Install Node.js 18.x
   - **Maven**: Install Maven 3.8.x

## Docker Registry Setup

### Option 1: Docker Hub
```bash
# Login to Docker Hub
docker login
```

### Option 2: Private Registry
```bash
# Run private registry
docker run -d -p 5000:5000 --name registry registry:2

# Configure insecure registry (for development)
echo '{"insecure-registries": ["localhost:5000"]}' | sudo tee /etc/docker/daemon.json
sudo systemctl restart docker
```

## Ansible Setup

### 1. Install Ansible
```bash
sudo apt update
sudo apt install ansible
```

### 2. Configure Inventory
Edit `ansible/inventory/production/hosts`:
```ini
[production]
prod-server-1 ansible_host=YOUR_SERVER_IP ansible_user=ubuntu

[production:vars]
environment=production
docker_registry=your-registry.com
```

### 3. Test Ansible Connection
```bash
ansible -i ansible/inventory/production production -m ping
```

## Application Deployment

### 1. Create Jenkins Pipeline

1. Go to **New Item** > **Pipeline**
2. Name: `ecommerce-pipeline`
3. Configure:
   - **Pipeline**: Definition from SCM
   - **SCM**: Git
   - **Repository URL**: Your Git repository
   - **Script Path**: `Jenkinsfile`

### 2. Configure Pipeline Parameters

Add the following parameters:
- `DOCKER_REGISTRY`: Default value `your-registry.com`
- `ENVIRONMENT`: Default value `staging`

### 3. Trigger Pipeline

The pipeline will automatically trigger on:
- Push to `main` branch (production deployment)
- Push to `develop` branch (staging deployment)
- Pull request creation

## Monitoring Setup

### 1. Graphite Installation
```bash
# Using Docker Compose
docker-compose up -d graphite
```

### 2. Grafana Installation
```bash
# Using Docker Compose
docker-compose up -d grafana
```

### 3. Configure Grafana

1. Access Grafana at `http://localhost:3002`
2. Default credentials: `admin/admin`
3. Add Graphite as data source:
   - URL: `http://graphite:80`
   - Access: Server (default)

### 4. Import Dashboards

1. Go to **Dashboards** > **Import**
2. Import the dashboard from `monitoring/grafana/provisioning/dashboards/ecommerce-dashboard.json`

## Security Configuration

### 1. SSL Certificates

For production, obtain SSL certificates:
```bash
# Using Let's Encrypt
sudo certbot --nginx -d app.production.com
```

### 2. Firewall Configuration
```bash
# Configure UFW
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 3. Database Security
```bash
# Secure PostgreSQL
sudo -u postgres psql
ALTER USER ecommerce PASSWORD 'strong_password';
```

## Testing the Pipeline

### 1. Local Testing
```bash
# Run tests locally
npm test
npm run test:coverage

# Build Docker image
docker build -t ecommerce-nextjs-app:test .

# Run application
docker run -p 3000:3000 ecommerce-nextjs-app:test
```

### 2. Pipeline Testing
1. Make a small change to the code
2. Commit and push to `develop` branch
3. Monitor Jenkins pipeline execution
4. Verify deployment to staging environment

### 3. Production Deployment
1. Merge `develop` to `main` branch
2. Monitor Jenkins pipeline
3. Approve production deployment when prompted
4. Verify production deployment

## Troubleshooting

### Common Issues

#### Jenkins Pipeline Fails
- Check Jenkins logs: `sudo tail -f /var/log/jenkins/jenkins.log`
- Verify credentials are configured correctly
- Check network connectivity to target servers

#### Docker Build Fails
- Verify Dockerfile syntax
- Check for missing dependencies
- Ensure Docker daemon is running

#### Ansible Deployment Fails
- Test SSH connectivity: `ssh ubuntu@YOUR_SERVER_IP`
- Verify Ansible inventory configuration
- Check target server requirements

#### Application Health Check Fails
- Verify application is running: `docker ps`
- Check application logs: `docker logs container_name`
- Verify environment variables are set correctly

### Log Locations

- **Jenkins**: `/var/log/jenkins/jenkins.log`
- **Application**: `/opt/ecommerce-nextjs-app/logs/`
- **Nginx**: `/var/log/nginx/`
- **Docker**: `docker logs container_name`

## Performance Optimization

### 1. Jenkins Performance
- Increase JVM heap size: `-Xmx4g -Xms2g`
- Configure build executors based on server capacity
- Use Jenkins agents for distributed builds

### 2. Docker Optimization
- Use multi-stage builds
- Optimize layer caching
- Use .dockerignore to exclude unnecessary files

### 3. Application Performance
- Enable Next.js optimizations
- Configure Redis caching
- Optimize database queries
- Use CDN for static assets

## Backup and Recovery

### 1. Database Backups
```bash
# Automated backup script
#!/bin/bash
pg_dump ecommerce > /backups/ecommerce_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Configuration Backups
```bash
# Backup Ansible configurations
tar -czf ansible_backup_$(date +%Y%m%d).tar.gz ansible/
```

### 3. Disaster Recovery
- Document recovery procedures
- Test backup restoration regularly
- Maintain multiple backup locations

## Maintenance

### 1. Regular Updates
- Update dependencies monthly
- Apply security patches immediately
- Monitor for deprecated packages

### 2. Performance Monitoring
- Monitor resource usage
- Set up alerts for critical metrics
- Regular performance reviews

### 3. Security Audits
- Regular security scans
- Dependency vulnerability checks
- Access control reviews

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Jenkins and application logs
3. Consult the project documentation
4. Contact the DevOps team

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Ansible Documentation](https://docs.ansible.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Grafana Documentation](https://grafana.com/docs/) 