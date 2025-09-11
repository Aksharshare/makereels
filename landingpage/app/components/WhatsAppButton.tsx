'use client';

import { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [telegramVisible, setTelegramVisible] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Show button after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Show tooltip after 3 seconds on all devices
      const showTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);

      return () => {
        clearTimeout(showTimer);
      };
    }
  }, [isVisible]);

  const handleMainButtonClick = () => {
    if (!showOptions) {
      // Opening - show options with staggered animation
      setShowOptions(true);
      setTimeout(() => setWhatsappVisible(true), 25);
      setTimeout(() => setTelegramVisible(true), 50);
    } else {
      // Closing - hide options immediately
      setShowOptions(false);
      setWhatsappVisible(false);
      setTelegramVisible(false);
    }
  };

  const handleWhatsAppClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send/?phone=14303527141&text=Hey%21+I%27d+like+a+quick+edit+to+my+video&type=phone_number&app_absent=0";
    window.open(whatsappUrl, '_blank');
    setShowOptions(false);
    setWhatsappVisible(false);
    setTelegramVisible(false);
  };

  const handleTelegramClick = () => {
    const telegramUrl = "https://t.me/Ananttalks?text=Hi,%20can%20you%20quickly%20edit%20this%20video%3F";
    window.open(telegramUrl, '_blank');
    setShowOptions(false);
    setWhatsappVisible(false);
    setTelegramVisible(false);
  };

  const handleCloseTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(false);
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Main Button */}
      <button
        onClick={handleMainButtonClick}
        className={`group relative text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 flex items-center justify-center ${
          showOptions 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-yellow-400 hover:bg-yellow-500'
        }`}
        aria-label="Contact us"
        style={{ backgroundColor: showOptions ? '#EF4444' : '#FFCC00' }}
      >
        {/* Film Icon or Cross Icon */}
        {showOptions ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">🎬</span>
        )}
        
        {/* Pulse animation */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20" 
          style={{ backgroundColor: showOptions ? '#EF4444' : '#FFCC00' }}
        ></div>
        
        {/* Tooltip */}
        <div className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg transition-opacity duration-300 whitespace-nowrap ${
          showOptions || !showTooltip
            ? 'opacity-0' 
            : 'opacity-100'
        }`}>
          <div className="flex items-center gap-0">
            <span>Edit My Video Instantly ⚡</span>
            <button
              onClick={handleCloseTooltip}
              className="ml-1 text-gray-300 hover:text-white transition-colors"
              aria-label="Close tooltip"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </button>

      {/* Options Dropdown */}
      <>
        {/* WhatsApp Button - Left of main button */}
        <button
          onClick={handleWhatsAppClick}
          className={`absolute bottom-0 right-full mr-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-150 transform hover:scale-110 ${
            whatsappVisible 
              ? 'opacity-100 scale-100 translate-x-0' 
              : 'opacity-0 scale-50 translate-x-4 pointer-events-none'
          }`}
          aria-label="Contact us on WhatsApp"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>

        {/* Telegram Button - Above main button */}
        <button
          onClick={handleTelegramClick}
          className={`absolute bottom-full right-0 mb-4 mr-2 bg-blue-400 hover:bg-blue-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-150 transform hover:scale-110 flex items-center justify-center ${
            telegramVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-50 translate-y-4 pointer-events-none'
          }`}
          aria-label="Contact us on Telegram"
        >
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
        </button>
      </>
    </div>
  );
}
