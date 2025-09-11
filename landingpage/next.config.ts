import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://*.hotjar.com https://*.hotjar.io https://*.infird.com https://*.dropbox.com https://*.dropboxapi.com https://*.clarity.ms;
      connect-src 'self' http://localhost:8000 https://*.hotjar.com https://*.hotjar.io https://*.make.com wss://*.hotjar.com https://*.dropbox.com https://*.dropboxapi.com https://api.dropboxapi.com https://*.clarity.ms;
      img-src 'self' data: https://*.hotjar.com https://*.dropbox.com https://*.dropboxapi.com;
      media-src 'self' blob:;
      style-src 'self' 'unsafe-inline' https://*.hotjar.com;
      frame-src https://*.hotjar.com https://*.dropbox.com;
      worker-src 'self' blob: https://*.hotjar.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim(),
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
