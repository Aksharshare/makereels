'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX, FiCheck, FiAlertCircle, FiMail, FiPlay } from 'react-icons/fi';
import { getApiUrl, API_CONFIG } from '../../lib/config';

interface UploadStatus {
  isUploading: boolean;
  progress: number;
  success: boolean;
  error: string | null;
  fileName?: string;
  file?: File;
  thumbnail?: string;
  taskId?: string;
  processingStatus?: 'PROCESSING' | 'SUCCESS' | 'FAILURE';
  processingProgress?: number;
  shortClips?: Array<{
    filename: string;
    url: string;
    size: number;
  }>;
}

interface PhonePrompt {
  show: boolean;
  phone: string;
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
}

export default function VideoUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    success: false,
    error: null
  });
  const [phonePrompt, setPhonePrompt] = useState<PhonePrompt>({
    show: false,
    phone: '',
    isSubmitting: false,
    submitted: false,
    error: null
  });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Progress bar effect for processing
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    
    if (uploadStatus.processingStatus === 'PROCESSING') {
      const startTime = Date.now();
      const duration = 3 * 60 * 1000; // 3 minutes in milliseconds
      
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        setUploadStatus(prev => ({
          ...prev,
          processingProgress: progress
        }));
      }, 1000); // Update every second
    }
    
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [uploadStatus.processingStatus]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    console.log('=== FRONTEND UPLOAD DEBUG ===');
    console.log('File received:', {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified
    });

    // Check if it's a video file
    const videoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/wmv', 'video/flv', 'video/webm', 'video/mkv'];
    if (!videoTypes.includes(file.type)) {
      setUploadStatus({
        isUploading: false,
        progress: 0,
        success: false,
        error: 'Please upload a video file (MP4, MOV, AVI, MKV, etc.)',
        fileName: file.name
      });
      return;
    }

    // Check file size (max 500MB)
    if (file.size > 500 * 1024 * 1024) {
      setUploadStatus({
        isUploading: false,
        progress: 0,
        success: false,
        error: 'File too large. Maximum size: 500MB',
        fileName: file.name
      });
      return;
    }

    // Start upload process
    setUploadStatus({
      isUploading: true,
      progress: 0,
      success: false,
      error: null,
      fileName: file.name,
      file: file
    });

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);

      // Upload to backend API
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.UPLOAD), {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.status === 'UPLOADED') {
        // Upload successful, show phone form
        setUploadStatus({
          isUploading: false,
          progress: 100,
          success: true,
          error: null,
          fileName: file.name,
          file: file
        });

        // Show phone prompt
        setPhonePrompt({
          show: true,
          phone: '',
          isSubmitting: false,
          submitted: false,
          error: null
        });
      } else if (response.ok && result.status === 'PROCESSING') {
        // Direct processing (fallback for old flow)
        setUploadStatus({
          isUploading: false,
          progress: 100,
          success: true,
          error: null,
          fileName: file.name,
          file: file,
          taskId: result.task_id
        });

        // Start polling for processing status
        pollProcessingStatus(result.task_id);
      } else {
        // Upload failed
        setUploadStatus({
          isUploading: false,
          progress: 0,
          success: false,
          error: result.error || 'Upload failed. Please try again.',
          fileName: file.name
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        isUploading: false,
        progress: 0,
        success: false,
        error: 'Network error. Please check your connection and try again.',
        fileName: file.name
      });
    }

    // Initialize phone prompt state
    setPhonePrompt({
      show: false,
      phone: '',
      isSubmitting: false,
      submitted: false,
      error: null
    });
  };

  const resetUpload = () => {
    setUploadStatus({
      isUploading: false,
      progress: 0,
      success: false,
      error: null,
      thumbnail: undefined,
      taskId: undefined,
      processingStatus: undefined,
      processingProgress: undefined,
      shortClips: undefined
    });
    setPhonePrompt({
      show: false,
      phone: '',
      isSubmitting: false,
      submitted: false,
      error: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validatePhone = (phone: string) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Check if it's a valid phone number (at least 10 digits)
    return cleaned.length >= 10;
  };

  const generateThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        // Set canvas size
        canvas.width = 160;
        canvas.height = 120;
        
        // Seek to 1 second to get a good frame
        video.currentTime = 1;
      };
      
      video.onseeked = () => {
        if (ctx) {
          // Draw the video frame to canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert to data URL
          const thumbnail = canvas.toDataURL('image/jpeg', 0.8);
          resolve(thumbnail);
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      
      video.onerror = () => {
        reject(new Error('Error loading video'));
      };
      
      // Load the video file
      video.src = URL.createObjectURL(file);
    });
  };

  const pollProcessingStatus = async (taskId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.TASK_STATUS}/${taskId}`));
        const result = await response.json();

        if (response.ok) {
          setUploadStatus(prev => ({
            ...prev,
            processingStatus: result.status
          }));

          if (result.status === 'SUCCESS') {
            clearInterval(pollInterval);
            // Get the results
            const resultResponse = await fetch(getApiUrl(`${API_CONFIG.ENDPOINTS.TASK_RESULT}/${taskId}/result`));
            const resultData = await resultResponse.json();
            
            if (resultResponse.ok) {
              setUploadStatus(prev => ({
                ...prev,
                shortClips: resultData.short_clips || []
              }));
            }
          } else if (result.status === 'FAILURE') {
            clearInterval(pollInterval);
            setUploadStatus(prev => ({
              ...prev,
              error: result.error || 'Processing failed'
            }));
          }
        }
      } catch (error) {
        console.error('Error polling status:', error);
        clearInterval(pollInterval);
        setUploadStatus(prev => ({
          ...prev,
          error: 'Error checking processing status'
        }));
      }
    }, 2000); // Poll every 2 seconds

    // Clear interval after 10 minutes to prevent infinite polling
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 600000);
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhonePrompt(prev => ({ ...prev, error: null }));
    
    if (!phonePrompt.phone) {
      setPhonePrompt(prev => ({ ...prev, error: 'Please enter your phone number' }));
      return;
    }
    
    if (!validatePhone(phonePrompt.phone)) {
      setPhonePrompt(prev => ({ ...prev, error: 'Please enter a valid phone number' }));
      return;
    }

    setPhonePrompt(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      // Send phone to Make.com webhook directly
      await fetch('https://hook.us2.make.com/8hamrtcq1dj54cfvmrpwb72mok8lb417', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phonePrompt.phone }),
      });
      
      // Start video processing with phone number
      const processResponse = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.START_PROCESSING), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phonePrompt.phone }),
      });
      
      const processResult = await processResponse.json();
      
      if (processResponse.ok && processResult.status === 'PROCESSING') {
        console.log('Phone submitted and processing started:', phonePrompt.phone);
        
        // Hide phone form and show processing status
        setPhonePrompt(prev => ({ 
          ...prev, 
          isSubmitting: false, 
          show: false  // Hide the phone form
        }));
        
        // Update upload status with task ID and start polling
        setUploadStatus(prev => ({
          ...prev,
          taskId: processResult.task_id,
          processingStatus: 'PROCESSING',  // Set processing status
          processingProgress: 0  // Initialize progress bar
        }));
        
        // Start polling for processing status
        pollProcessingStatus(processResult.task_id);
      } else {
        throw new Error(processResult.error || 'Failed to start processing');
      }
      
    } catch (err) {
      console.error('Phone submission error:', err);
      setPhonePrompt(prev => ({ 
        ...prev, 
        isSubmitting: false, 
        error: 'Something went wrong. Please try again.' 
      }));
    }
  };

  return (
    <div className="w-full">
      {!uploadStatus.success && !uploadStatus.error && !uploadStatus.isUploading && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors cursor-pointer ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FiUpload className="w-6 h-6 text-blue-600" />
            </div>
            
            <div className="text-left">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Drop your video here
              </h3>
              <p className="text-sm text-gray-600">
                or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  browse files
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus.isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Uploading...</h3>
              <p className="text-xs text-gray-600">{uploadStatus.fileName}</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadStatus.progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{uploadStatus.progress}% complete</p>
        </div>
      )}

      {uploadStatus.success && !uploadStatus.processingStatus && !phonePrompt.show && !uploadStatus.taskId && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative">
          {/* Remove button */}
          <button
            onClick={resetUpload}
            className="absolute top-3 right-3 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors group"
            title="Remove video"
          >
            <FiX className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-12 rounded-lg shadow-lg relative overflow-hidden bg-gray-200">
                {uploadStatus.thumbnail ? (
                  <img 
                    src={uploadStatus.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <FiPlay className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">
                  {uploadStatus.processingStatus === 'PROCESSING' 
                    ? 'Processing your video...' 
                    : uploadStatus.processingStatus === 'SUCCESS'
                    ? 'Video processed successfully!'
                    : 'Video ready for processing!'}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{uploadStatus.fileName}</p>
                {uploadStatus.processingStatus === 'PROCESSING' && (
                  <p className="text-xs text-blue-600">AI is creating viral shorts from your video...</p>
                )}
                {uploadStatus.processingStatus === 'SUCCESS' && uploadStatus.shortClips && (
                  <p className="text-xs text-green-600">Generated {uploadStatus.shortClips.length} viral shorts!</p>
                )}
                {!uploadStatus.processingStatus && (
                  <p className="text-xs text-gray-500">Submit your phone number to receive your viral shorts</p>
                )}
              </div>
            </div>
          </div>


          {/* Show results if processing is complete */}
          {uploadStatus.processingStatus === 'SUCCESS' && uploadStatus.shortClips && uploadStatus.shortClips.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-900 text-sm mb-2">Your viral shorts are ready!</h4>
              <div className="space-y-2">
                {uploadStatus.shortClips.map((clip, index) => (
                  <div key={index} className="flex items-center justify-between bg-white rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <FiPlay className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">{clip.filename}</span>
                    </div>
                    <a
                      href={`${API_CONFIG.BASE_URL}${clip.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Phone form - only show if not processing or if processing failed */}
          {(!uploadStatus.processingStatus || uploadStatus.processingStatus === 'FAILURE') && (
            <form onSubmit={handlePhoneSubmit} className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="tel"
                  value={phonePrompt.phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers, plus sign, and spaces
                    const filteredValue = value.replace(/[^\d\s+]/g, '');
                    // Limit to 15 characters (international standard)
                    if (filteredValue.length <= 15) {
                      setPhonePrompt(prev => ({ ...prev, phone: filteredValue }));
                    }
                  }}
                  placeholder="Enter Phone number with Country code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-black"
                  disabled={phonePrompt.isSubmitting}
                  maxLength={15}
                />
                <button
                  type="submit"
                  disabled={phonePrompt.isSubmitting}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {phonePrompt.isSubmitting ? 'Sending...' : 'Get My Shorts'}
                </button>
              </div>
              
              {phonePrompt.error && (
                <p className="text-red-500 text-xs">{phonePrompt.error}</p>
              )}
            </form>
          )}
        </div>
      )}

      {uploadStatus.success && (uploadStatus.processingStatus || uploadStatus.taskId) && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 relative">
          {/* Remove button */}
          <button
            onClick={resetUpload}
            className="absolute top-3 right-3 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors group"
            title="Remove video"
          >
            <FiX className="w-3 h-3 text-gray-600 group-hover:text-gray-800" />
          </button>
          
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-16 h-12 rounded-lg shadow-lg relative overflow-hidden bg-gray-200">
                {uploadStatus.thumbnail ? (
                  <img 
                    src={uploadStatus.thumbnail} 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FiPlay className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="text-left">
                <h3 className="font-bold text-gray-900 text-lg">
                  {uploadStatus.processingStatus === 'PROCESSING' 
                    ? 'Processing your video...' 
                    : uploadStatus.processingStatus === 'SUCCESS'
                    ? 'Video processed successfully!'
                    : 'Video ready for processing!'}
                </h3>
                <p className="text-sm text-gray-600 mb-1">{uploadStatus.fileName}</p>
                {uploadStatus.processingStatus === 'PROCESSING' && (
                  <p className="text-xs text-blue-600">AI is creating viral shorts from your video...</p>
                )}
                {uploadStatus.processingStatus === 'SUCCESS' && uploadStatus.shortClips && (
                  <p className="text-xs text-green-600">Generated {uploadStatus.shortClips.length} viral shorts!</p>
                )}
              </div>
            </div>
          </div>

          {/* Show processing status with progress bar */}
          {uploadStatus.processingStatus === 'PROCESSING' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">Processing...</h3>
                  <p className="text-xs text-gray-600">AI is creating viral shorts from your video</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${uploadStatus.processingProgress || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1 text-center">
                {Math.round(uploadStatus.processingProgress || 0)}% complete
              </p>
            </div>
          )}

          {/* Show success status */}
          {uploadStatus.processingStatus === 'SUCCESS' && uploadStatus.shortClips && (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <FiCheck className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Processing Complete!</h3>
                    <p className="text-xs text-gray-600">Generated {uploadStatus.shortClips.length} viral shorts</p>
                  </div>
                </div>
              </div>
              
              {/* Show short clips */}
              <div className="grid grid-cols-1 gap-3">
                {uploadStatus.shortClips.map((clip, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center">
                        <FiPlay className="w-3 h-3 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{clip.filename}</p>
                        <p className="text-xs text-gray-500">{typeof clip.size === 'number' ? clip.size.toFixed(1) + ' MB' : clip.size}</p>
                      </div>
                      <a
                        href={`${API_CONFIG.BASE_URL}${clip.url}`}
                        download={clip.filename}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}


      {uploadStatus.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <FiAlertCircle className="w-3 h-3 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Upload Failed</h3>
              <p className="text-xs text-gray-600">{uploadStatus.fileName}</p>
            </div>
          </div>
          <p className="text-xs text-red-700 mb-3">{uploadStatus.error}</p>
          <button
            onClick={resetUpload}
            className="text-xs text-red-600 hover:text-red-700 font-medium"
          >
            Try again
          </button>
        </div>
      )}


    </div>
  );
} 