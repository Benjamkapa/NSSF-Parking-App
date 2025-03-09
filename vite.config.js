import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "favicon.ico",
        "maskable-icon.png",
        "icon512_rounded.png",
        "apple-touch-icon.png",
        "dark.png" // Ensure this is included
      ],
      manifest: {
        id: "org.nssf.parking",
        name: "NSSF Parking App",
        short_name: "Parking App",
        description: "NSSF Parking App | Modernizing NSSF parking service",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        lang: "en-US",
        display: "standalone",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icon512_rounded.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^.*\.(png|jpg|jpeg|svg|gif|ico)$/, // Cache images
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://178.18.254.142:4000', // Target your HTTP API server
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api/v1/nssf'), // Rewrite the URL path
  //     },
  //   },
  // },
});



