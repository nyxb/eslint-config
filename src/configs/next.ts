import type { ConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from '../types'

import { GLOB_NEXT } from '../globs'
import { parserTs, pluginNext, pluginReact, pluginReactHooks } from '../plugins'

export function next(
   options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {},
): ConfigItem[] {
   const {
      overrides = {},
      stylistic = true,
   } = options

   const {
      indent = 3,
   } = typeof stylistic === 'boolean' ? {} : stylistic

   return [
      {
         name: 'nyxb:next:setup',
         plugins: {
            next: pluginNext,
            react: pluginReact,
            reactHooks: pluginReactHooks,
         },
      },
      {
         files: [GLOB_NEXT],
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
            ...pluginReact.configs['jsx-runtime'].rules as any,
            ...pluginReactHooks.configs.recommended.rules as any,
            ...pluginNext.configs.recommended.rules as any,
            ...pluginNext.configs['core-web-vitals'].rules as any,
            'import/no-anonymous-default-export': 'warn',
            'jsx-a11y/alt-text': [
               'warn',
               {
                  elements: ['img'],
                  img: ['Image'],
               },
            ],
            'jsx-a11y/aria-props': 'warn',
            'jsx-a11y/aria-proptypes': 'warn',
            'jsx-a11y/aria-unsupported-elements': 'warn',
            'jsx-a11y/role-has-required-aria-props': 'warn',
            'jsx-a11y/role-supports-aria-props': 'warn',
            'next/google-font-display': 'error',
            'next/google-font-preconnect': 'error',
            'next/inline-script-id': 'error',
            'next/next-script-for-ga': 'error',
            'next/no-assign-module-variable': 'error',
            'next/no-async-client-component': 'error',
            'next/no-before-interactive-script-outside-document': 'error',
            'next/no-css-tags': 'error',
            'next/no-document-import-in-page': 'error',
            'next/no-duplicate-head': 'error',
            'next/no-head-element': 'error',
            'next/no-head-import-in-document': 'error',
            'next/no-html-link-for-pages': 'error',
            'next/no-img-element': 'error',
            'next/no-page-custom-font': 'error',
            'next/no-script-component-in-head': 'error',
            'next/no-styled-jsx-in-document': 'error',
            'next/no-sync-scripts': 'error',
            'next/no-title-in-document-head': 'error',
            'next/no-typos': 'error',
            'next/no-unwanted-polyfillio': 'error',
            'react/display-name': 'error',
            'react/jsx-no-target-blank': 'warn',
            'react/no-unknown-property': 'warn',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'warn',
            'reactHooks/exhaustive-deps': 'error',
            'style/jsx-indent': ['error', indent],
            ...stylistic
               ? {
                  }
               : {},

            ...overrides,
         },
      },
   ]
}
