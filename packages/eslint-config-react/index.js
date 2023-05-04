module.exports = {
   extends: [
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      '@nyxb/eslint-config-ts',
   ],
   settings: {
      react: {
         version: '17.0',
      },
   },
   rules: {
      'jsx-quotes': [
         'error',
         'prefer-single',
      ],
      'react/react-in-jsx-scope': 'off',
   },
}
