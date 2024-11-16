import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'MK',
        short_name: 'MK',
        description: 'Vive les jolies filles',
        theme_color: "#060716",
        background_color: "#060716",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
        icons: [
          {
            src: 'mk144.png',
            sizes: '144x144',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
