import type { OptionsStylistic, TypedFlatConfigItem } from '../types'

import { pluginNyxb, pluginImport } from '../plugins'

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

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { count: 1 }],
            }
          : {},
      },
    },
  ]
}
