// @ts-expect-error missing types
import styleMigrate from '@stylistic/eslint-plugin-migrate'
import { nyxb } from './src'

export default nyxb(
   {
      vue: true,
      react: true,
      solid: true,
      svelte: true,
      astro: true,
      typescript: true,
      formatters: true,
   },
   {
      ignores: [
         'fixtures',
         '_fixtures',
         'README.md',
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
