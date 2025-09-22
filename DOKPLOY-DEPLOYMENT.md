# Dokploy Deployment Guide - FarWay Company Website

This guide explains how to deploy the FarWay Company static website on Dokploy.

## Prerequisites

- Dokploy server running and accessible
- Domain name pointed to your Dokploy server (currently configured for `farway.quantumtaskai.com`)
- Git repository with your website code
- Docker and Docker Compose support on Dokploy

## Project Structure

```
farway-website/
├── index.html              # Main homepage
├── styles.css              # Custom styles
├── script.js               # JavaScript functionality
├── images/                 # Images and assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── dokploy.json           # Dokploy-specific configuration
├── .dockerignore          # Docker ignore file
└── DOKPLOY-DEPLOYMENT.md  # This file
```

## Deployment Files

### 1. Dockerfile
The `Dockerfile` uses nginx:alpine to serve the static website with:
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Optimized caching for static assets (1 year for CSS/JS/images, 1 hour for HTML)
- Gzip compression for better performance
- wget for health checks (alpine-compatible)

### 2. docker-compose.yml
Configured with:
- Traefik labels for automatic SSL and routing
- Health checks using wget
- Production environment settings
- Security headers middleware

### 3. dokploy.json
Dokploy-specific configuration including:
- Domain settings with automatic SSL for `farway.quantumtaskai.com`
- Resource limits (512M memory, 0.5 CPU)
- Health check configuration
- Security and monitoring settings

## Deployment Steps

### Method 1: Git Repository Deployment (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, etc.)

2. **Access Dokploy Dashboard**
   - Open your Dokploy web interface
   - Navigate to Applications/Services

3. **Create New Application**
   - Click "Create Application"
   - Choose "Compose" as the application type
   - Name: `farway-website`

4. **Configure Git Source**
   - Repository URL: `https://github.com/quantumtaskai/farway-web.git`
   - Branch: `main` (or your main branch)
   - Build Path: `.` (root directory)

5. **Domain Configuration**
   - Primary domain: `farway.quantumtaskai.com`
   - Enable SSL/TLS with Let's Encrypt

6. **Environment Variables**
   ```
   NODE_ENV=production
   ```

7. **Deploy**
   - Click "Deploy"
   - Monitor build logs
   - Wait for deployment completion

### Method 2: Direct File Upload

1. **Package your files**
   ```bash
   cd /mnt/sdd2/projects/farway-website
   tar -czf farway-website.tar.gz .
   ```

2. **Upload to Dokploy**
   - Use Dokploy's file upload feature
   - Upload the tar.gz file
   - Extract in the application directory

3. **Configure and deploy** (same as Method 1, steps 5-7)

## Domain Configuration

### Current Domain: farway.quantumtaskai.com

#### DNS Setup
Point your domain to your Dokploy server:

```
Type: A
Name: farway
Value: YOUR_DOKPLOY_SERVER_IP
```

### Changing Domain Later

To change from `farway.quantumtaskai.com` to `farwaycompany.com` or any other domain:

#### Option 1: Via Dokploy Dashboard
1. Open your application in Dokploy dashboard
2. Go to "Domains" section
3. Remove old domain: `farway.quantumtaskai.com`
4. Add new domain: `farwaycompany.com`
5. Enable SSL/TLS for the new domain
6. Redeploy the application

#### Option 2: Via Configuration Files
1. **Update docker-compose.yml**:
   ```yaml
   - "traefik.http.routers.farway-website.rule=Host(`farwaycompany.com`)"
   ```

2. **Update dokploy.json**:
   ```json
   "domains": [
     {
       "host": "farwaycompany.com",
       "https": true,
       "certificateType": "letsencrypt"
     }
   ]
   ```

3. **Update DNS records**:
   ```
   Type: A
   Name: @
   Value: YOUR_DOKPLOY_SERVER_IP

   Type: A
   Name: www
   Value: YOUR_DOKPLOY_SERVER_IP
   ```

4. **Redeploy** via Dokploy dashboard

## SSL Certificate

Dokploy will automatically generate Let's Encrypt certificates for your configured domains.

## Health Checks

The application includes health checks that:
- Check every 30 seconds using wget
- Timeout after 10 seconds
- Retry up to 3 times
- Allow 30 seconds startup time

## Monitoring and Maintenance

### Application Monitoring
Dokploy provides built-in monitoring for:
- CPU usage
- Memory usage
- Network traffic
- Application health status

### Logs
Access application logs through Dokploy dashboard:
- Container logs
- Nginx access logs
- Error logs

### Updates and Redeployment

**For Git-based deployment:**
1. Push changes to your Git repository
2. Trigger redeploy in Dokploy dashboard
3. Monitor deployment progress

**For file-based deployment:**
1. Update files locally
2. Create new package: `tar -czf update.tar.gz .`
3. Upload and redeploy through Dokploy

## Troubleshooting

### Common Issues

**1. Build Failures**
- Check Docker build logs in Dokploy
- Verify all files are present
- Check .dockerignore isn't excluding necessary files

**2. SSL Certificate Issues**
- Ensure domain DNS is pointing to Dokploy server
- Wait 5-10 minutes for DNS propagation
- Check Let's Encrypt rate limits

**3. Application Not Accessible**
- Verify port 80 and 443 are open on Dokploy server
- Check domain configuration in Dokploy
- Verify container is running and healthy

**4. Static Files Not Loading**
- Check nginx configuration in Dockerfile
- Verify file paths in HTML are correct
- Check browser developer tools for 404 errors

### Debug Commands

**Check container status:**
```bash
docker ps | grep farway-website
```

**View container logs:**
```bash
docker logs farway-website
```

**Test container locally:**
```bash
docker build -t farway-website .
docker run -p 8080:80 farway-website
```

## Performance Optimization

### Caching Strategy
The nginx configuration implements:
- 1 year cache for static assets (CSS, JS, images)
- 1 hour cache for HTML files
- Gzip compression for text-based assets
- Proper cache headers for SEO

### Resource Usage
- Memory limit: 512MB
- CPU limit: 0.5 cores
- Suitable for static website with moderate traffic

### Scaling
For higher traffic:
1. Increase resource limits in `dokploy.json`
2. Consider using CDN for static assets
3. Enable Dokploy's load balancing features

## Security Features

### Built-in Security Headers
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### SSL/TLS
- Automatic HTTPS redirect
- Strong cipher suites
- HTTP/2 support

### Network Security
- Container isolated in Docker network
- Only necessary ports exposed (80, 443)
- Firewall rules configured

## Backup Strategy

The static website doesn't require database backups, but consider:
- Regular Git repository backups
- Dokploy configuration export
- Domain and SSL certificate documentation

## Support

For issues with:
- **Dokploy Platform**: Check Dokploy documentation
- **Website Content**: Review HTML/CSS/JS files
- **Domain/SSL**: Contact your domain registrar
- **Server Issues**: Check with your hosting provider

## FarWay Company Information

- **Company**: FarWay Company - Global FMCG Distribution Excellence
- **Website**: Currently `farway.quantumtaskai.com` (can be changed to `farwaycompany.com`)
- **Email**: Contact@farwaycompany.com
- **Business**: 23+ years of excellence across 40+ countries in FMCG distribution

Your FarWay Company website is now ready for professional deployment on Dokploy with automatic SSL, monitoring, and optimized performance!