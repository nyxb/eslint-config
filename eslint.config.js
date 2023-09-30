import sortKeys from 'eslint-plugin-sort-keys'
import nyxb from './dist/index.js'

export default nyxb(
   {
      ignores: [
         'fixtures',
         '_fixtures',
      ],
      // typescript: {
      //   tsconfigPath: 'tsconfig.json',
      // },
   },
   {
      files: ['src/**/*.ts'],
      plugins: {
         'sort-keys': sortKeys,
      },
      rules: {
         'sort-keys/sort-keys-fix': 'error',
      },
   },
)
