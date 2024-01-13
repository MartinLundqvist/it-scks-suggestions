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
          other: ['nanoid', 'bad-words', 'styled-components'],
          firebaseFirestore: ['firebase/firestore'],
          firebase: [
            'firebase/auth',
            'firebase/app',
            'react-firebase-hooks/auth',
            'react-firebase-hooks/firestore',
          ],
        },
      },
    },
  },
});
