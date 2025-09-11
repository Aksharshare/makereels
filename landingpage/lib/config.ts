// Configuration for API endpoints
export const API_CONFIG = {
  // Backend API base URL
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-backend-domain.com'  // Replace with your production backend URL
    : 'http://localhost:8000',           // Local development backend URL
  
  // API endpoints
  ENDPOINTS: {
    UPLOAD: '/api/upload',
    TASK_STATUS: '/api/task',
    TASK_RESULT: '/api/task'
  }
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

