import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IPs
    port: 3000,
    strictPort: true,
    allowedHosts: [
      'sypheaicloud.fortiddns.com', // ✅ Explicitly allowing your specific DDNS
      'localhost',
      '127.0.0.1'
    ]
  }
})