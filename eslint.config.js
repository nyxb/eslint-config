import stylisticMigrate from '@stylistic/eslint-plugin-migrate'
import sortKeys from 'eslint-plugin-sort-keys'
import nyxb from '@nyxb/eslint-config'

export default nyxb(
  {
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      '@stylistic/migrate': stylisticMigrate,
      'sort-keys': sortKeys,
    },
    rules: {
      '@stylistic/migrate/rules': 'error',
      'sort-keys/sort-keys-fix': 'error',
    },
  },
)
