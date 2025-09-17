@echo off
REM Docker-only SSL Setup for MakeReels (Windows)
REM This script sets up SSL certificates using Docker containers only

echo [INFO] Docker-only SSL Setup for MakeReels
echo.
echo [INFO] This script will:
echo 1. Create required directories
echo 2. Start temporary nginx for certificate generation
echo 3. Generate SSL certificates using certbot container
echo 4. Copy certificates to nginx directory
echo 5. Clean up temporary files
echo.

REM Create necessary directories
echo [INFO] Creating required directories...
if not exist "nginx\ssl" mkdir nginx\ssl
if not exist "nginx\webroot" mkdir nginx\webroot
if not exist "nginx\logs" mkdir nginx\logs
if not exist "automationtool\input" mkdir automationtool\input
if not exist "automationtool\output" mkdir automationtool\output
if not exist "automationtool\config" mkdir automationtool\config

REM Create a temporary nginx config for initial certificate generation
echo [INFO] Creating temporary nginx configuration...
(
    echo events {
    echo     worker_connections 1024;
    echo }
    echo.
    echo http {
    echo     include       /etc/nginx/mime.types;
    echo     default_type  application/octet-stream;
    echo.
    echo     server {
    echo         listen 80;
    echo         server_name makereels.live www.makereels.live _;
    echo.
    echo         location /.well-known/acme-challenge/ {
    echo             root /var/www/certbot;
    echo         }
    echo.
    echo         location / {
    echo             return 200 'SSL setup in progress...';
    echo             add_header Content-Type text/plain;
    echo         }
    echo     }
    echo }
) > nginx\nginx-temp.conf

REM Create temporary docker-compose for SSL setup
echo [INFO] Creating temporary docker-compose for SSL setup...
(
    echo services:
    echo   nginx-temp:
    echo     image: nginx:alpine
    echo     ports:
    echo       - "80:80"
    echo     volumes:
    echo       - ./nginx/nginx-temp.conf:/etc/nginx/nginx.conf:ro
    echo       - ./nginx/webroot:/var/www/certbot
    echo     networks:
    echo       - makereels-network
    echo.
    echo   certbot:
    echo     image: certbot/certbot
    echo     volumes:
    echo       - ./nginx/ssl:/etc/letsencrypt
    echo       - ./nginx/webroot:/var/www/certbot
    echo     command: certonly --webroot --webroot-path=/var/www/certbot --email admin@makereels.live --agree-tos --no-eff-email -d makereels.live -d www.makereels.live
    echo     depends_on:
    echo       - nginx-temp
    echo     networks:
    echo       - makereels-network
    echo.
    echo networks:
    echo   makereels-network:
    echo     driver: bridge
) > docker-compose.ssl-temp.yml

echo [INFO] Starting temporary nginx for certificate generation...
docker-compose -f docker-compose.ssl-temp.yml up -d nginx-temp

echo [INFO] Waiting for nginx to start...
timeout /t 10 /nobreak >nul

echo [INFO] Generating SSL certificates...
docker-compose -f docker-compose.ssl-temp.yml run --rm certbot

echo [INFO] Copying certificates to nginx ssl directory...
if exist "nginx\ssl\live\makereels.live\fullchain.pem" (
    copy "nginx\ssl\live\makereels.live\fullchain.pem" "nginx\ssl\cert.pem"
    copy "nginx\ssl\live\makereels.live\privkey.pem" "nginx\ssl\key.pem"
    echo [SUCCESS] Certificates copied successfully
) else (
    echo [ERROR] Certificate generation failed
    pause
    exit /b 1
)

echo [INFO] Stopping temporary services...
docker-compose -f docker-compose.ssl-temp.yml down

echo [INFO] Cleaning up temporary files...
del nginx\nginx-temp.conf
del docker-compose.ssl-temp.yml

echo [SUCCESS] SSL setup completed successfully!
echo.
echo [INFO] Next steps:
echo 1. Deploy your application with SSL:
echo    docker-compose -f docker-compose.ssl.yml up -d
echo.
echo 2. Your application will be available at:
echo    https://makereels.live
echo.
echo 3. Set up auto-renewal (optional):
echo    Add a cron job to run: docker-compose -f docker-compose.ssl.yml run --rm certbot renew
echo.
echo [INFO] Certificate files:
echo    - nginx\ssl\cert.pem
echo    - nginx\ssl\key.pem

pause
