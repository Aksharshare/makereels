# MakeReels Deployment Guide

Simple deployment guide for MakeReels with Docker-only setup.

## 📋 **Essential Files**

### **Docker Compose Files:**
- `docker-compose.yml` - Local development
- `docker-compose.dev.yml` - Development with live reload
- `docker-compose.ssl.yml` - Production with SSL

### **Build Scripts:**
- `docker-hub-build.bat` - Build and push to Docker Hub (Windows)
- `docker-hub-build.sh` - Build and push to Docker Hub (Linux/Mac)

### **SSL Setup:**
- `setup-ssl.bat` - SSL setup (Windows)
- `setup-ssl.sh` - SSL setup (Linux/Mac)

## 🚀 **Deployment Steps**

### **1. Build and Push to Docker Hub**
```bash
# Login to Docker Hub
docker login

# Build and push images
.\docker-hub-build.bat
```

### **2. Set up SSL (Production)**
```bash
# Set up SSL certificates
.\setup-ssl.bat
```

### **3. Deploy**
```bash
# Production deployment with SSL
docker-compose -f docker-compose.ssl.yml up -d
```

## 🎯 **Quick Commands**

### **Local Development:**
```bash
docker-compose up --build
```

### **Development with Live Reload:**
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### **Production with SSL:**
```bash
docker-compose -f docker-compose.ssl.yml up -d
```

### **View Logs:**
```bash
docker-compose -f docker-compose.ssl.yml logs
```

### **Stop Services:**
```bash
docker-compose -f docker-compose.ssl.yml down
```

## 📁 **File Structure**

```
makereels/
├── docker-compose.yml          # Local development
├── docker-compose.dev.yml      # Development with live reload
├── docker-compose.ssl.yml      # Production with SSL
├── docker-hub-build.bat        # Build and push (Windows)
├── docker-hub-build.sh         # Build and push (Linux/Mac)
├── setup-ssl.bat              # SSL setup (Windows)
├── setup-ssl.sh               # SSL setup (Linux/Mac)
├── automationtool/            # Backend
├── landingpage/               # Frontend
└── nginx/                     # Nginx configuration
```

## 🔧 **Configuration**

### **Environment Variables:**
- Copy `env.production` to `.env` and update with your values
- Update API keys in `automationtool/config/config.env`

### **Domain:**
- Update `makereels.live` to your domain in all files

## 🎉 **That's It!**

Your MakeReels application is now ready for deployment with a clean, simple setup!


