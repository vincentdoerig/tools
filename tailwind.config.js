// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.vue', './src/**/*.ts'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme('colors.gray.300'),
            thead: {
              color: theme('colors.gray.200'),
            },
            a: {
              color: theme('colors.gray.200'),
              '&:hover': {
                color: theme('colors.gray.50'),
              },
            },
            h1: {
              color: theme('colors.gray.300'),
            },
            h2: {
              color: theme('colors.gray.300'),
            },
            h3: {
              color: theme('colors.gray.300'),
            },
            h4: {
              color: theme('colors.gray.300'),
            },
            h5: {
              color: theme('colors.gray.300'),
            },
            h6: {
              color: theme('colors.gray.300'),
            },
            strong: {
              color: theme('colors.gray.300'),
            },
            code: {
              color: theme('colors.gray.300'),
            },
            figcaption: {
              color: theme('colors.gray.500'),
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['dark'],
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      zIndex: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
