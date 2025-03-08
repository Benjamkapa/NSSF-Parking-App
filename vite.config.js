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
});



// // Bypassing CORS by proxy server via the file --> for API test
// import { defineConfig } from "vite";

// export default defineConfig({
//   resolve: {
//     alias: {
//       '@': '/src',
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'URL', //replace the URL with /api directory text.
//         changeOrigin: true, // Changes the origin of the request to the target URL
//         rewrite: (path) => path.replace(/^\/api/, ''), // Rewrites '/api' to match the API path
//       },
//     },
//   },
// });