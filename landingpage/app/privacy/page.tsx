'use client';

import { FiArrowLeft, FiShield, FiEye, FiLock, FiDatabase, FiGlobe, FiMail } from 'react-icons/fi';

export default function PrivacyPolicy() {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-600">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiEye className="w-6 h-6 mr-3 text-blue-600" />
                Information We Collect
              </h2>
              <p className="text-slate-700 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                upload videos, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Email address and account information</li>
                <li>Video content you upload for processing</li>
                <li>Usage data and preferences</li>
                <li>Communication history with our support team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiDatabase className="w-6 h-6 mr-3 text-green-600" />
                How We Use Your Information
              </h2>
              <p className="text-slate-700 mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Provide, maintain, and improve our AI video editing services</li>
                <li>Process your videos and generate AI-powered content</li>
                <li>Send you important updates about our service</li>
                <li>Respond to your questions and provide customer support</li>
                <li>Analyze usage patterns to improve our technology</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiLock className="w-6 h-6 mr-3 text-purple-600" />
                Data Security
              </h2>
              <p className="text-slate-700 mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information and video content. This includes:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiGlobe className="w-6 h-6 mr-3 text-indigo-600" />
                Data Sharing and Disclosure
              </h2>
              <p className="text-slate-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Your Rights and Choices
              </h2>
              <p className="text-slate-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain processing activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Cookies and Tracking
              </h2>
              <p className="text-slate-700 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
                and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Children's Privacy
              </h2>
              <p className="text-slate-700 mb-4">
                Our service is not intended for children under 13 years of age. We do not knowingly collect 
                personal information from children under 13. If you believe we have collected information from 
                a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                International Data Transfers
              </h2>
              <p className="text-slate-700 mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your data in accordance with 
                applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Changes to This Policy
              </h2>
              <p className="text-slate-700 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiMail className="w-6 h-6 mr-3 text-red-600" />
                Contact Us
              </h2>
              <p className="text-slate-700 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
                             <div className="bg-slate-50 rounded-lg p-6">
                 <div className="flex items-center">
                   <FiMail className="w-5 h-5 text-slate-600 mr-3" />
                   <span className="text-slate-700 font-medium">Email:</span>
                   <span className="text-slate-600 ml-2">admin@makereels.live</span>
                 </div>
               </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation links centered */}
          <div className="flex justify-center space-x-6 text-sm mb-8">
            <a href="/privacy" className="text-indigo-400 font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Contact</a>
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