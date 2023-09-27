import type { FlatESLintConfigItem } from 'eslint-define-config';
import { GLOB_REACT } from '../globs';
import { parserTs, pluginNext } from '../plugins';
import { OFF } from '../flags';
import type { OptionsHasTypeScript } from '../types';
import { renameRules } from '../utils'

export function next(options: OptionsHasTypeScript = {}): FlatESLintConfigItem[] {
  return [
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
      plugins: {
         'next': pluginNext, // Hinzugefügt das Next.js Plugin
       },
      rules: {
         ...renameRules(
            pluginNext.configs.recommended.rules, // Die tatsächlichen Regeln hängen von der Konfiguration ab, die Sie verwenden
            '@next/next/',
            'next/',
          ),
        'react/react-in-jsx-scope': OFF,
      },
    },
  ];
}
