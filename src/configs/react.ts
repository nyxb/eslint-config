import type { FlatESLintConfigItem } from 'eslint-define-config'
import { GLOB_REACT } from '../globs'
import { parserTs, pluginReact } from '../plugins'
import { OFF } from '../flags'
import type { OptionsHasTypeScript } from '../types'

export function react(options: OptionsHasTypeScript = {}): FlatESLintConfigItem[] {
  return [
    {
      files: [GLOB_REACT],
      languageOptions: {
        parser: options.typescript ? (parserTs as any) : null,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: 'module',
        },
      },
      plugins: {
         'react': pluginReact, // Hinzugefügt das Next.js Plugin
       },
      rules: {
        'react/react-in-jsx-scope': OFF,
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
      },
    },
  ]
}
