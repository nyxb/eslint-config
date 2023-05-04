const { isPackageExists } = require('local-pkg')

const TS = isPackageExists('typescript')

if (!TS)
   console.warn('[@nyxb/eslint-config] TypeScript is not installed, fallback to JS only.')

module.exports = {
   overrides: [
      {
         files: ['*.tsx', '*.ts', '*.jsx', '*.js'],
         rules: {
            'no-unused-vars': 'off',
            'no-undef': 'off',
            'no-use-before-define': 'off',
            ...(TS
               ? { '@typescript-eslint/no-unused-vars': 'off', '@typescript-eslint/no-use-before-define': 'off' }
               : null),
         },
      },
   ],
   extends: [
      'eslint-config-next',
   ],
   rules: {
      '@typescript-eslint/no-use-before-define': 'off',
      'jsx-quotes': [
         'error',
         'prefer-single',
      ],
      'react/react-in-jsx-scope': 'off',
      '@next/next/google-font-display': 'warn',
      '@next/next/google-font-preconnect': 'warn',
      '@next/next/inline-script-id': 'warn',
      '@next/next/next-script-for-ga': 'warn',
      '@next/next/no-assign-module-variable': 'warn',
      '@next/next/no-before-interactive-script-outside-document': 'warn',
      '@next/next/no-css-tags': 'warn',
      '@next/next/no-document-import-in-page': 'warn',
      '@next/next/no-duplicate-head': 'warn',
      '@next/next/no-head-element': 'warn',
      '@next/next/no-head-import-in-document': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
      '@next/next/no-img-element': 'warn',
      '@next/next/no-page-custom-font': 'warn',
      '@next/next/no-script-component-in-head': 'warn',
      '@next/next/no-styled-jsx-in-document': 'warn',
      '@next/next/no-sync-scripts': 'warn',
      '@next/next/no-title-in-document-head': 'warn',
      '@next/next/no-typos': 'warn',
      '@next/next/no-unwanted-polyfillio': 'warn',
   },
}
