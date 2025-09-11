# Start from a slim Python image
FROM python:3.10-slim

# Install FFmpeg dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your entire project code into the container
COPY . .

# Create necessary directories
RUN mkdir -p /app/input /app/output

# Create startup script for Flask app
RUN echo '#!/bin/bash\n\
# Start Flask app\n\
python app.py\n\
' > /app/start.sh && chmod +x /app/start.sh

# Expose port 8000 (Hostinger KVM 2)
EXPOSE 8000

# Start Flask app
CMD ["/app/start.sh"]
