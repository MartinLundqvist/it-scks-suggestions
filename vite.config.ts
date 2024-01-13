import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: [
            'react-firebase-hooks/auth',
            'react-firebase-hooks/firestore',
            'firebase/auth',
            'firebase/app',
          ],
          firebaseFirestore: ['firebase/firestore'],
          other: ['nanoid', 'bad-words', 'styled-components'],
        },
      },
    },
  },
});
