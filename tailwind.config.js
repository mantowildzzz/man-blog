/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0a0a0f',
          surface: '#121218',
          border: '#1e1e2e'
        },
        neon: {
          blue: '#00d4ff',
          purple: '#8b5cf6',
          pink: '#ff00aa'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
