// Configuration for API endpoints
export const API_CONFIG = {
  // Backend API base URL
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  
  // API endpoints
  ENDPOINTS: {
    UPLOAD: '/api/upload',
    START_PROCESSING: '/api/start-processing',
    TASK_STATUS: '/api/task',
    TASK_RESULT: '/api/task'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

