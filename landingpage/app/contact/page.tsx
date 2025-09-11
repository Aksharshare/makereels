'use client';

import { useState } from 'react';
import { FiArrowLeft, FiMail, FiSend, FiMessageSquare, FiUser, FiCheckCircle } from 'react-icons/fi';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-3 md:top-4 z-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/30 backdrop-blur-2xl rounded-full shadow-lg border border-white/30 px-4 md:px-6 py-3 md:py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 md:space-x-4">
                <img 
                  src="/headerlogo.png" 
                  alt="AI Video Editor Logo" 
                  className="max-h-[26px] sm:max-h-[40px] object-contain"
                />
              </div>
              
              <div className="flex items-center space-x-3 md:space-x-4">
                <a href="/" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors font-medium">
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions about our AI video editing service? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                      <FiUser className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      <FiMail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              
                             <div className="space-y-6">
                 <div className="flex items-start">
                   <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                     <FiMail className="w-6 h-6 text-blue-600" />
                   </div>
                   <div>
                     <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                     <p className="text-slate-600 mb-2">admin@makereels.live</p>
                     <p className="text-sm text-slate-500">We typically respond within 24 hours</p>
                   </div>
                 </div>
               </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">How does the AI video editing work?</h3>
                  <p className="text-slate-600 text-sm">
                    Our AI analyzes your video content to automatically identify viral moments, 
                    generate captions, and create engaging titles and tags.
                  </p>
                </div>
                
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">What video formats are supported?</h3>
                  <p className="text-slate-600 text-sm">
                    We support MP4, MOV, AVI, and most common video formats up to 4K resolution.
                  </p>
                </div>
                
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Is there a free trial?</h3>
                  <p className="text-slate-600 text-sm">
                    Yes! We offer a free trial with full access to all features, no credit card required.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">How long does processing take?</h3>
                  <p className="text-slate-600 text-sm">
                    Most videos are processed within 2-5 minutes, depending on length and complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation links centered */}
          <div className="flex justify-center space-x-6 text-sm mb-8">
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="text-indigo-400 font-medium">Contact</a>
          </div>

          {/* Full-width footer logo */}
          <div className="w-full px-0 mb-6">
            <img
              src="/footerlogo.png"
              alt="Makereels Logo"
              className="w-full object-cover"
            />
          </div>

          {/* Copyright */}
          <div className="border-t border-slate-800 pt-4 text-center text-sm text-slate-400">
            <p>&copy; 2025 Makereels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 