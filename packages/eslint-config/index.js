module.exports = {
   extends: [
      '@nyxb/eslint-config-nextjs',
      '@nyxb/eslint-config-vue',
   ],
   rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
   },
   settings: {
      react: {
         version: '18',
      }
   }
}
