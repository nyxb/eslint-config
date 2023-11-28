import { interopDefault } from '../utils'
import type { FlatConfigItem, StylisticConfig } from '../types'
import { pluginNyxb } from '../plugins'

export async function stylistic(options: StylisticConfig = {}): Promise<FlatConfigItem[]> {
   const {
      indent = 3,
      jsx = true,
      quotes = 'single',
      semi = false,
   } = options

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

            'curly': ['error', 'multi-or-nest', 'consistent'],
            'nyxb/consistent-list-newline': 'error',
            'nyxb/if-newline': 'error',
            'nyxb/indent-binary-ops': ['error', { indent }],

            'nyxb/top-level-function': 'error',
         },
      },
   ]
}
