'use client';

import { FiArrowLeft, FiFileText, FiCheckCircle, FiXCircle, FiAlertTriangle, FiUsers, FiShield, FiMail } from 'react-icons/fi';

export default function TermsOfService() {
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
              <FiFileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-slate-600">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiCheckCircle className="w-6 h-6 mr-3 text-green-600" />
                Acceptance of Terms
              </h2>
              <p className="text-slate-700 mb-4">
                By accessing and using Makereels ("Service"), you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiUsers className="w-6 h-6 mr-3 text-blue-600" />
                Use License
              </h2>
              <p className="text-slate-700 mb-4">
                Permission is granted to temporarily use our AI video editing service for personal or commercial 
                video creation purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Modify or copy the materials for unauthorized distribution</li>
                <li>Use the materials for any commercial purpose without proper licensing</li>
                <li>Attempt to reverse engineer any software contained in the service</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiShield className="w-6 h-6 mr-3 text-purple-600" />
                User Responsibilities
              </h2>
              <p className="text-slate-700 mb-4">
                As a user of our service, you agree to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not upload content that violates copyright or intellectual property rights</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt the service or servers</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiXCircle className="w-6 h-6 mr-3 text-red-600" />
                Prohibited Uses
              </h2>
              <p className="text-slate-700 mb-4">
                You may not use our service to:
              </p>
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Upload content that is illegal, harmful, threatening, abusive, or defamatory</li>
                <li>Infringe on any intellectual property or other rights of any party</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Upload viruses, malware, or other harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated systems to access the service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiAlertTriangle className="w-6 h-6 mr-3 text-orange-600" />
                Intellectual Property
              </h2>
              <p className="text-slate-700 mb-4">
                The service and its original content, features, and functionality are and will remain the 
                exclusive property of Makereels and its licensors. The service is protected by copyright, 
                trademark, and other laws.
              </p>
              <p className="text-slate-700 mb-4">
                You retain ownership of content you upload, but grant us a license to process and store 
                your content for the purpose of providing our AI video editing services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Service Availability
              </h2>
              <p className="text-slate-700 mb-4">
                We strive to maintain high availability of our service, but we do not guarantee uninterrupted 
                access. We may temporarily suspend the service for maintenance, updates, or other operational reasons.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Limitation of Liability
              </h2>
              <p className="text-slate-700 mb-4">
                In no event shall Makereels, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages, including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Disclaimers
              </h2>
              <p className="text-slate-700 mb-4">
                The service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, 
                expressed or implied, and hereby disclaim and negate all other warranties, including without 
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, 
                or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Termination
              </h2>
              <p className="text-slate-700 mb-4">
                We may terminate or suspend your account and bar access to the service immediately, without 
                prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                limitation, including but not limited to a breach of the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Governing Law
              </h2>
              <p className="text-slate-700 mb-4">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                Makereels operates, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Changes to Terms
              </h2>
              <p className="text-slate-700 mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will provide at least 30 days notice prior to any new terms 
                taking effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <FiMail className="w-6 h-6 mr-3 text-red-600" />
                Contact Information
              </h2>
              <p className="text-slate-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
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
            <a href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-indigo-400 font-medium">Terms of Service</a>
            <a href="/contact" className="hover:text-indigo-400 transition-colors">Contact</a>
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