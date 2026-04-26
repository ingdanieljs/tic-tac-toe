import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path para GitHub Pages: https://<usuario>.github.io/<repo>/
  // Si despliegas en un dominio raíz (user.github.io) o dominio propio, cambia a '/'
  base: '/gv-tic-tac-toe/',
  plugins: [react()],
})
