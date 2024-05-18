import type { OptionsStylistic, TypedFlatConfigItem } from '../types'
import { pluginNyxb, pluginImport } from '../plugins'
import { GLOB_SRC_EXT } from '../globs'

export async function imports(options: OptionsStylistic = {}): Promise<TypedFlatConfigItem[]> {
  const {
    stylistic = true,
  } = options

  return [
    {
      name: 'nyxb/imports/rules',
      plugins: {
        nyxb: pluginNyxb,
        import: pluginImport,
      },
      rules: {
        'nyxb/import-dedupe': 'error',
        'nyxb/no-import-dist': 'error',
        'nyxb/no-import-node-modules-by-path': 'error',

        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
    {
      files: ['**/bin/**/*', `**/bin.${GLOB_SRC_EXT}`],
      name: 'nyxb/imports/disables/bin',
      rules: {
        'nyxb/no-import-dist': 'off',
        'nyxb/no-import-node-modules-by-path': 'off',
      },
    },
  ]
}
