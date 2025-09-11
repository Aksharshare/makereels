# Frontend-Backend Integration Guide

This guide explains how to connect the Next.js landing page frontend with the Python Flask backend for AI video processing.

## Architecture Overview

- **Frontend**: Next.js landing page with video upload component
- **Backend**: Python Flask API with AI video processing pipeline
- **Communication**: REST API with CORS enabled

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd automationtool
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the Flask backend server:
   ```bash
   python app.py
   ```
   
   The backend will run on `http://localhost:8000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd landingpage
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:3000`

## API Endpoints

### Backend API Endpoints

- `POST /api/upload` - Upload video file for processing
- `GET /api/task/{task_id}` - Get processing status
- `GET /api/task/{task_id}/result` - Get processing results

### Frontend Configuration

The frontend uses a configuration file (`landingpage/lib/config.ts`) to manage API endpoints:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com'  // Production URL
    : 'http://localhost:8000',           // Development URL
  // ...
};
```

## How It Works

1. **Video Upload**: User uploads a video file through the frontend
2. **File Validation**: Frontend validates file type and size
3. **API Upload**: File is sent to backend `/api/upload` endpoint
4. **Background Processing**: Backend processes video using AI pipeline
5. **Status Polling**: Frontend polls `/api/task/{task_id}` for status updates
6. **Result Display**: When complete, frontend fetches results and displays download links

## Features

- ✅ Real-time processing status updates
- ✅ File validation (type, size)
- ✅ Progress tracking with polling
- ✅ Download links for processed videos
- ✅ Error handling and user feedback
- ✅ CORS configuration for cross-origin requests

## Video Processing Pipeline

The backend processes videos through these steps:
1. **Add Subtitles**: AI transcription and subtitle burning
2. **Trim Silence**: Remove awkward pauses and filler words
3. **Create Shorts**: Generate viral-worthy short clips
4. **Generate Titles**: AI-powered title and tag generation
5. **Upload & Schedule**: (Optional) Upload to YouTube

## Configuration

### Backend Configuration

Edit `automationtool/config/master_config.json` to configure:
- Input/output folders
- Pipeline steps (enable/disable)
- Processing parameters

### Frontend Configuration

Edit `landingpage/lib/config.ts` to configure:
- Backend API URL
- Endpoint paths
- Environment-specific settings

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure Flask-CORS is installed and configured
2. **File Upload Fails**: Check file size limits and supported formats
3. **Processing Stuck**: Check backend logs for errors
4. **Connection Refused**: Verify backend is running on correct port

### Debug Mode

Enable debug logging in the backend by setting:
```python
app.run(host='0.0.0.0', port=port, debug=True)
```

## Production Deployment

1. **Backend**: Deploy Flask app to your preferred hosting service
2. **Frontend**: Build and deploy Next.js app
3. **Configuration**: Update API URLs in `config.ts`
4. **CORS**: Update CORS origins in `app.py`

## Security Considerations

- File size limits (500MB max)
- File type validation
- CORS configuration
- Input sanitization
- Error message sanitization

## Next Steps

- Add user authentication
- Implement file storage (AWS S3, etc.)
- Add email notifications
- Implement user dashboard
- Add payment processing

