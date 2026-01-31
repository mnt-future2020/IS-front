import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.browser.v8.clerk.io https://*.clerk.com https://*.googleapis.com https://*.gstatic.com https://*.zohostatic.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://clerk.browser.v8.clerk.io https://*.clerk.com https://*.convex.cloud",
              "worker-src 'self' blob:",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com https://webfonts.zohostatic.com",
              "img-src 'self' data: https:",
              "connect-src 'self' https://*.clerk.accounts.dev https://api.clerk.com https://clerk.browser.v8.clerk.io https://*.convex.cloud wss://*.convex.cloud ws://localhost:* http://localhost:* http://127.0.0.1:*"
            ].join("; ")
          },
        ],
      },
    ];
  },
};

export default nextConfig;
