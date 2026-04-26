import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/tic-tac-toe/',
  plugins: [react()],
})
