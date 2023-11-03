/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      keyframes: {
      ping: {
        '0%':{transform: 'scale(1)',
        opacity: '0.6' },
        '50%': { transform: 'scale(1.5)',
        opacity: '0.3' },
        ' 100%': { transform: 'scale(2)',
          opacity: '0' },
      },
      ping2: {
        '0%':{transform: 'scale(1)',
        opacity: '0.6' },
        '25%': { transform: 'scale(1.2)',
        opacity: '0.3' },
        ' 100%': { transform: 'scale(2)',
          opacity: '0' },
      },
    },
    animation: {
      ping: 'ping 1s ease-in-out infinite forwards',
    },
    animation: {
      ping2: 'ping2 1s ease-in-out infinite forwards',
    }
  },
  },
  plugins: [],
}

