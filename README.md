# View logs in real-time
.\docker-scripts.bat logs

# View specific service logs
.\docker-scripts.bat logs backend
.\docker-scripts.bat logs frontend

# Stop services when done testing
.\docker-scripts.bat stop

# Restart if needed
.\docker-scripts.bat restart

## 🏗️ Architecture

```
makereels/
├── landingpage/          # Next.js Frontend
│   ├── app/             # Next.js 15 app directory
│   ├── components/      # React components
│   └── lib/            # Configuration and utilities
├── automationtool/      # Python Flask Backend
│   ├── src/            # Core processing modules
│   ├── modules/        # Video processing modules
│   ├── config/         # Configuration files
│   ├── input/          # Video input directory
│   └── output/         # Processed video output
├── docker-compose.yml   # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── docker-scripts.bat   # Windows Docker management script
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd makereels
```

### 2. Set Up Environment Variables
```bash
# Copy the environment template
cp docker.env .env

# Edit .env file with your API keys
# Required: OPENROUTER_API_KEY, DEEPGRAM_API_KEY
# Optional: TELEGRAM_BOT_TOKEN, YouTube credentials
```

### 3. Start the Application

#### Using Docker Scripts (Recommended)
```bash
# Windows
.\docker-scripts.bat start

# Linux/Mac
./docker-scripts.sh start
```

#### Using Docker Compose Directly
```bash
# Production mode
docker-compose up --build

# Development mode (with live reloading)
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose up --build -d
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

## 🛠️ Docker Management

### Windows Scripts
```bash
# Start services
.\docker-scripts.bat start

# Development mode
.\docker-scripts.bat dev

# Stop services
.\docker-scripts.bat stop

# Restart services
.\docker-scripts.bat restart

# View logs
.\docker-scripts.bat logs
.\docker-scripts.bat logs backend
.\docker-scripts.bat logs frontend

# Health check
.\docker-scripts.bat health

# Clean up
.\docker-scripts.bat cleanup
```

### Linux/Mac Scripts
```bash
# Start services
./docker-scripts.sh start

# Development mode
./docker-scripts.sh dev

# Stop services
./docker-scripts.sh stop

# View logs
./docker-scripts.sh logs
./docker-scripts.sh logs backend

# Health check
./docker-scripts.sh health

# Clean up
./docker-scripts.sh cleanup
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Backend Configuration
PORT=8000
FLASK_ENV=production
PYTHONPATH=/app

# Frontend Configuration
NODE_ENV=production
NEXT_PUBLIC_API_URL=http://localhost:8000

# API Keys (Required)
OPENROUTER_API_KEY=your_openrouter_api_key_here
DEEPGRAM_API_KEY=your_deepgram_api_key_here

# Optional API Keys
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# Security
SECRET_KEY=your_secret_key_here
```

### Pipeline Configuration

Edit `automationtool/config/master_config.json`:

```json
{
  "input_folder": "/app/input",
  "output_folder": "/app/output",
  "pipeline_steps": {
    "add_subtitles": true,
    "trim_silence": true,
    "create_shorts": true,
    "generate_titles": false,
    "upload_shorts": false
  }
}
```

## 📁 Directory Structure

### Input/Output Directories
- `automationtool/input/` - Place your video files here
- `automationtool/output/` - Processed videos will appear here
  - `output/processed/` - Final processed videos
  - `output/shorts/` - Generated short videos
  - `output/subtitles/` - Subtitle files

### Volume Mounts
The following directories are mounted as Docker volumes:
- `./automationtool/input` → `/app/input` (backend input files)
- `./automationtool/output` → `/app/output` (backend output files)
- `./automationtool/config` → `/app/config` (backend configuration)

## 🧪 Testing

### 1. Health Checks
```bash
# Check service status
docker-compose ps

# Test backend health
curl http://localhost:8000/health

# Test frontend
curl http://localhost:3000
```

### 2. Upload Test
1. Go to http://localhost:3000
2. Upload a video file
3. Start processing
4. Monitor logs: `.\docker-scripts.bat logs backend`

### 3. API Testing
```bash
# Test upload endpoint
curl -X POST -F "file=@test.mp4" http://localhost:8000/api/upload

# Test processing
curl -X POST http://localhost:8000/api/start-processing \
  -H "Content-Type: application/json" \
  -d '{"filename": "test.mp4", "phone": "1234567890"}'
```

## 🚀 Production Deployment

### 1. Update Configuration
```bash
# Update docker-compose.yml
NEXT_PUBLIC_API_URL=https://your-domain.com
```

### 2. Deploy with Docker Compose
```bash
# Build and start
docker-compose up --build -d

# Set up reverse proxy (nginx)
# Configure SSL certificates
# Set up monitoring and logging
```

### 3. Environment Setup
- Set production environment variables
- Configure proper file permissions
- Set up backup strategies for volumes
- Configure monitoring and alerting

## 🔍 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check if ports are in use
   netstat -an | findstr :3000
   netstat -an | findstr :8000
   ```

2. **Permission Issues**
   ```bash
   # Check file permissions
   ls -la automationtool/input/
   ls -la automationtool/output/
   ```

3. **API Key Errors**
   ```bash
   # Verify environment variables
   docker-compose exec backend env | grep API
   ```

4. **Memory Issues**
   - Ensure at least 4GB RAM available
   - Close other applications
   - Consider increasing Docker memory limits

### Debugging Steps

1. **Check Container Logs**
   ```bash
   docker-compose logs backend
   docker-compose logs frontend
   ```

2. **Verify Environment Variables**
   ```bash
   docker-compose exec backend env
   docker-compose exec frontend env
   ```

3. **Test API Connectivity**
   ```bash
   curl http://localhost:8000/health
   curl http://localhost:8000/debug
   ```

4. **Check File Permissions**
   ```bash
   ls -la automationtool/input/
   ls -la automationtool/output/
   ```

## 📊 Performance Considerations

- **Video Processing**: Large video files require significant CPU and memory
- **Storage**: Ensure adequate disk space for input/output files
- **Network**: Consider network bandwidth for file uploads
- **Concurrent Users**: Scale backend service for multiple users

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive configuration
- Regularly update base images for security patches
- Consider using Docker secrets for production deployments
- Implement proper authentication and authorization

## 📈 Monitoring

The application includes health check endpoints:
- **Backend**: `GET /health`
- **Backend Debug**: `GET /debug`

Monitor these endpoints to ensure service health and troubleshoot issues.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the troubleshooting section above
- Review the logs using `.\docker-scripts.bat logs`
- Open an issue on GitHub

## 🔄 Updates

To update the application:
```bash
# Pull latest changes
git pull origin main

# Rebuild containers
.\docker-scripts.bat restart

# Or rebuild from scratch
.\docker-scripts.bat cleanup
.\docker-scripts.bat start
```

---

**MakeReels** - Transform your videos with AI-powered automation! 🎬✨
