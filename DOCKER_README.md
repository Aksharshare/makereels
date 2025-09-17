# Docker Deployment Guide

This guide explains how to run the MakeReels application using Docker containers.

## Architecture

The application consists of two main services:
- **Frontend**: Next.js application running on port 3000
- **Backend**: Python Flask application running on port 8000

## Prerequisites

- Docker
- Docker Compose
- At least 4GB of available RAM
- At least 10GB of available disk space

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd makereels
   ```

2. **Set up environment variables**:
   ```bash
   cp docker.env .env
   # Edit .env file with your API keys and configuration
   ```

3. **Build and start the containers**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Backend Health Check: http://localhost:8000/health

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Backend Configuration
PORT=8000
FLASK_ENV=production
PYTHONPATH=/app

# Frontend Configuration
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:8000

# API Keys (required)
OPENAI_API_KEY=your_openai_api_key_here
DEEPGRAM_API_KEY=your_deepgram_api_key_here
YOUTUBE_CLIENT_ID=your_youtube_client_id_here
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret_here

# Security
SECRET_KEY=your_secret_key_here
```

### Volume Mounts

The following directories are mounted as volumes for data persistence:
- `./automationtool/input` → `/app/input` (backend input files)
- `./automationtool/output` → `/app/output` (backend output files)
- `./automationtool/config` → `/app/config` (backend configuration)

## Docker Commands

### Build and Start
```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d --build

# Start only specific service
docker-compose up frontend
docker-compose up backend
```

### Stop and Cleanup
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove all containers and images
docker-compose down --rmi all
```

### Logs and Debugging
```bash
# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs frontend
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f

# Execute commands in running container
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Health Checks
```bash
# Check service status
docker-compose ps

# Check backend health
curl http://localhost:8000/health

# Check frontend health
curl http://localhost:3000
```

## Development

### Local Development with Docker
```bash
# Start services in development mode
docker-compose -f docker-compose.dev.yml up --build
```

### Rebuilding After Changes
```bash
# Rebuild specific service
docker-compose build frontend
docker-compose build backend

# Rebuild and restart
docker-compose up --build frontend
```

## Production Deployment

### Using Docker Compose
1. Set up your production environment variables
2. Use a reverse proxy (nginx) for SSL termination
3. Set up proper logging and monitoring
4. Configure backup strategies for volumes

### Using Docker Swarm or Kubernetes
The containers can be deployed to orchestration platforms:
- Docker Swarm
- Kubernetes
- AWS ECS
- Google Cloud Run

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000 and 8000 are not in use
2. **Permission issues**: Check file permissions on mounted volumes
3. **Memory issues**: Ensure sufficient RAM for video processing
4. **API key errors**: Verify all required environment variables are set

### Debugging Steps

1. Check container logs:
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

2. Verify environment variables:
   ```bash
   docker-compose exec backend env
   docker-compose exec frontend env
   ```

3. Check file permissions:
   ```bash
   ls -la automationtool/input/
   ls -la automationtool/output/
   ```

4. Test API connectivity:
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:8000/debug
   ```

## Performance Considerations

- **Video Processing**: Large video files require significant CPU and memory
- **Storage**: Ensure adequate disk space for input/output files
- **Network**: Consider network bandwidth for file uploads
- **Concurrent Users**: Scale backend service for multiple users

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive configuration
- Regularly update base images for security patches
- Consider using Docker secrets for production deployments

## Monitoring

The application includes health check endpoints:
- Backend: `GET /health`
- Backend Debug: `GET /debug`

Monitor these endpoints to ensure service health and troubleshoot issues.


