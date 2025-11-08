import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050506',
        'bg-2': '#0c1014',
        ink: '#f8fafc',
        muted: '#94a3b8',
        accent: '#2592d0'
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        space: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
