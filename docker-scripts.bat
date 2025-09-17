@echo off
REM Docker Management Scripts for MakeReels (Windows)

if "%1"=="start" (
    echo [INFO] Building and starting MakeReels services...
    docker-compose up --build -d
    if %errorlevel% equ 0 (
        echo [SUCCESS] Services started successfully!
        echo [INFO] Frontend: http://localhost:3000
        echo [INFO] Backend: http://localhost:8000
        echo [INFO] Health Check: http://localhost:8000/health
    ) else (
        echo [ERROR] Failed to start services
    )
    goto :eof
)

if "%1"=="stop" (
    echo [INFO] Stopping MakeReels services...
    docker-compose down
    echo [SUCCESS] Services stopped successfully!
    goto :eof
)

if "%1"=="restart" (
    echo [INFO] Restarting MakeReels services...
    docker-compose down
    docker-compose up --build -d
    echo [SUCCESS] Services restarted successfully!
    goto :eof
)

if "%1"=="logs" (
    if "%2"=="" (
        echo [INFO] Viewing logs for all services...
        docker-compose logs -f
    ) else (
        echo [INFO] Viewing logs for %2 service...
        docker-compose logs -f %2
    )
    goto :eof
)

if "%1"=="health" (
    echo [INFO] Checking service health...
    docker-compose ps
    echo.
    echo [INFO] Testing backend health...
    curl -f http://localhost:8000/health >nul 2>&1
    if %errorlevel% equ 0 (
        echo [SUCCESS] Backend is healthy
    ) else (
        echo [ERROR] Backend health check failed
    )
    echo [INFO] Testing frontend...
    curl -f http://localhost:3000 >nul 2>&1
    if %errorlevel% equ 0 (
        echo [SUCCESS] Frontend is accessible
    ) else (
        echo [ERROR] Frontend is not accessible
    )
    goto :eof
)

if "%1"=="cleanup" (
    echo [INFO] Cleaning up Docker resources...
    docker-compose down -v
    docker system prune -f
    echo [SUCCESS] Cleanup completed!
    goto :eof
)

if "%1"=="dev" (
    echo [INFO] Starting MakeReels in development mode...
    docker-compose -f docker-compose.dev.yml up --build
    goto :eof
)

REM Show help if no valid command provided
echo MakeReels Docker Management Script
echo.
echo Usage: %0 [COMMAND]
echo.
echo Commands:
echo   start       Build and start all services
echo   dev         Start services in development mode
echo   stop        Stop all services
echo   restart     Restart all services
echo   logs        View logs (optionally specify service: frontend^|backend)
echo   health      Check service health
echo   cleanup     Stop services and clean up Docker resources
echo.
echo Examples:
echo   %0 start
echo   %0 dev
echo   %0 logs backend
echo   %0 health