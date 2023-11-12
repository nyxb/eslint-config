// @ts-check
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import nyxb from './dist/index.js'

export default nyxb(
   {
      vue: true,
      typescript: true,
      ignores: [
         'fixtures',
         '_fixtures',
      ],
   },
   {
      files: ['src/**/*.ts'],
      rules: {
         'perfectionist/sort-objects': 'error',
      },
   },
   {
      files: ['src/configs/*.ts'],
      plugins: {
         'style-migrate': styleMigrate,
      },
      rules: {
         'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
      },
   },
)
