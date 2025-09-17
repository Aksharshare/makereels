@echo off
REM MakeReels Docker Hub Build and Push Script for Windows
REM This script builds and pushes the MakeReels images to Docker Hub

setlocal enabledelayedexpansion

REM Configuration
set DOCKER_HUB_USERNAME=aksharshare
set IMAGE_NAME=makereelsv2
set VERSION=1.0.0
set LATEST_TAG=latest

echo [INFO] Starting Docker Hub build and push process...
echo [INFO] Docker Hub Username: %DOCKER_HUB_USERNAME%
echo [INFO] Image Name: %IMAGE_NAME%
echo [INFO] Version: %VERSION%

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running. Please start Docker and try again.
    exit /b 1
)

REM Check if user is logged in to Docker Hub
docker info | findstr "Username" >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] You are not logged in to Docker Hub.
    echo [INFO] Please run: docker login
    pause
)

REM Build and push backend
echo [INFO] Building backend image...
docker build -t %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%VERSION% -t %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%LATEST_TAG% -f automationtool/Dockerfile automationtool
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build backend image
    exit /b 1
)
echo [SUCCESS] Backend image built successfully

echo [INFO] Pushing backend image to Docker Hub...
docker push %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%VERSION%
docker push %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%LATEST_TAG%
if %errorlevel% neq 0 (
    echo [ERROR] Failed to push backend image
    exit /b 1
)
echo [SUCCESS] Backend image pushed successfully

REM Build and push frontend
echo [INFO] Building frontend image...
docker build -t %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%VERSION% -t %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%LATEST_TAG% -f landingpage/Dockerfile landingpage
if %errorlevel% neq 0 (
    echo [ERROR] Failed to build frontend image
    exit /b 1
)
echo [SUCCESS] Frontend image built successfully

echo [INFO] Pushing frontend image to Docker Hub...
docker push %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%VERSION%
docker push %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%LATEST_TAG%
if %errorlevel% neq 0 (
    echo [ERROR] Failed to push frontend image
    exit /b 1
)
echo [SUCCESS] Frontend image pushed successfully

echo [SUCCESS] All images have been built and pushed to Docker Hub!
echo [INFO] Images available at:
echo [INFO]   Backend: docker pull %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%VERSION%
echo [INFO]   Frontend: docker pull %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%VERSION%
echo [INFO]   Latest: docker pull %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-backend:%LATEST_TAG%
echo [INFO]   Latest: docker pull %DOCKER_HUB_USERNAME%/%IMAGE_NAME%-frontend:%LATEST_TAG%

echo [WARNING] Don't forget to:
echo [WARNING]   1. Update docker-compose files to use your Docker Hub images
echo [WARNING]   2. Test the images on a clean environment
echo [WARNING]   3. Update documentation with the new image references

pause
