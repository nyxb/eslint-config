import type { FlatESLintConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '../types'
import { GLOB_REACT } from '../globs'
import { parserTs, pluginReact } from '../plugins'
import { OFF } from '../flags'

export function react(
   options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {},
): FlatESLintConfigItem[] {
   const {
      overrides = {},
      stylistic = true,
   } = options

   return [
      {
         name: 'nyxb:react:setup',
         plugins: {
            react: pluginReact,
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
         name: 'nyxb:react:rules',
         rules: {
            ...pluginReact.configs.recommended.rules as any,
            'jsx-quotes': ['error', 'prefer-single'],
            'react/jsx-uses-react': 'error',
            'react/jsx-uses-vars': 'error',
            'react/react-in-jsx-scope': OFF,

            ...stylistic
               ? {
                     // Hier stilistischen Regeln für React hinzufügen
                  }
               : {},

            ...overrides,
         },
      },
   ]
}
