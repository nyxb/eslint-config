import type { ConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '../types'

import { GLOB_REACT } from '../globs'  // Ersetzt GLOB_REACT mit GLOB_NEXT für bessere Klarheit
import { parserTs, pluginNext } from '../plugins'

export function next(
   options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {},
): ConfigItem[] {
   const {
      overrides = {},
      stylistic = true,
   } = options

   return [
      {
         name: 'nyxb:next:setup',
         plugins: {
            next: pluginNext,
         },
      },
      {
         files: [GLOB_REACT],
         languageOptions: {
            parser: options.typescript ? parserTs as any : null,
            parserOptions: {
               ecmaFeatures: {
                  jsx: true,
               },
               sourceType: 'module',
            },
         },
         name: 'nyxb:next:rules',
         rules: {
            ...pluginNext.configs.recommended.rules as any,

            'react/react-in-jsx-scope': 'off',

            // Hier nach Bedarf weitere Next.js-spezifische Regeln hinzufügen

            ...stylistic
               ? {
                     // Hier stilistische Regeln hinzufügen, ähnlich wie im Vue-Codeblock
                  }
               : {},

            ...overrides,
         },
      },
   ]
}
