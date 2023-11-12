import type { ConfigItem, OptionsStylistic } from '../types'
import { pluginImport, pluginNyxb } from '../plugins'

export function imports(options: OptionsStylistic = {}): ConfigItem[] {
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
        'nyxb/no-import-node-modules-by-path': 'error',

        ...stylistic
          ? {
              'import/newline-after-import': ['error', { considerComments: true, count: 1 }],
            }
          : {},
      },
    },
  ]
}
