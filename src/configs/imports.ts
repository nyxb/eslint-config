import type { FlatConfigItem, OptionsStylistic } from '../types'
import { pluginImport, pluginNyxb } from '../plugins'
import { GLOB_SRC_EXT } from '../globs'

export async function imports(options: OptionsStylistic = {}): Promise<FlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'nyxb:imports',
      plugins: {
        import: pluginImport,
        nyxb: pluginNyxb,
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',

        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',
        'nyxb/import-dedupe': 'error',
        'nyxb/no-import-dist': 'error',
        'nyxb/no-import-node-modules-by-path': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'nyxb:imports:bin',
      rules: {
        'nyxb/no-import-dist': 'off',
        'nyxb/no-import-node-modules-by-path': 'off',
      },
    },
  ]
}
