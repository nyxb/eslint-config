import { interopDefault } from '../utils'
import type { FlatConfigItem, OptionsOverrides, StylisticConfig } from '../types'
import { pluginNyxb } from '../plugins'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(
  options: StylisticConfig & OptionsOverrides = {},
): Promise<FlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: 'nyxb:stylistic',
      plugins: {
        nyxb: pluginNyxb,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        'nyxb/consistent-list-newline': 'error',
        'nyxb/if-newline': 'error',
        'nyxb/top-level-function': 'error',

        'curly': ['error', 'multi-or-nest', 'consistent'],

        ...overrides,
      },
    },
  ]
}
