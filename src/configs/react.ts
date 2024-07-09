import { isPackageExists } from 'local-pkg'
import { ensurePackages, interopDefault, toArray } from '../utils'
import type { OptionsFiles, OptionsOverrides, OptionsTypeScriptWithTypes, TypedFlatConfigItem } from '../types'
import { GLOB_SRC } from '../globs'

// react refresh
const ReactRefreshAllowConstantExportPackages = [
  'vite',
]
const RemixPackages = [
  '@remix-run/node',
  '@remix-run/react',
  '@remix-run/serve',
  '@remix-run/dev',
]
const NextJsPackages = [
  'next',
]

export async function react(
  options: OptionsTypeScriptWithTypes & OptionsOverrides & OptionsFiles = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    files = [GLOB_SRC],
    overrides = {},
  } = options

  await ensurePackages([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh',
  ])

  const tsconfigPath = options?.tsconfigPath
    ? toArray(options.tsconfigPath)
    : undefined
  const isTypeAware = !!tsconfigPath

  const [
    pluginReact,
    pluginReactHooks,
    pluginReactRefresh,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i))
  const isUsingRemix = RemixPackages.some(i => isPackageExists(i))
  const isUsingNext = NextJsPackages.some(i => isPackageExists(i))

  const plugins = pluginReact.configs.all.plugins

  return [
    {
      name: 'nyxb/react/setup',
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': pluginReactHooks,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': pluginReactRefresh,
      },
    },
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ...isTypeAware ? { project: tsconfigPath } : {},
        },
        sourceType: 'module',
      },
      name: 'nyxb/react/rules',
      rules: {
        // recommended rules from @eslint-react/dom
        'react-dom/no-children-in-void-dom-elements': 'warn',
        'react-dom/no-dangerously-set-innerhtml': 'off',
        'react-dom/no-dangerously-set-innerhtml-with-children': 'off',
        'react-dom/no-find-dom-node': 'error',
        'react-dom/no-missing-button-type': 'off',
        'react-dom/no-missing-iframe-sandbox': 'off',
        'react-dom/no-namespace': 'error',
        'react-dom/no-render-return-value': 'error',
        'react-dom/no-script-url': 'warn',
        'react-dom/no-unsafe-iframe-sandbox': 'warn',
        'react-dom/no-unsafe-target-blank': 'warn',

        // recommended rules react-hooks
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/rules-of-hooks': 'off',

        // react refresh
        'react-refresh/only-export-components': [
          'off',
          {
            allowConstantExport: isAllowConstantExport,
            allowExportNames: [
              ...(isUsingNext
                ? [
                    'config',
                    'generateStaticParams',
                    'metadata',
                    'generateMetadata',
                    'viewport',
                    'generateViewport',
                  ]
                : []),
              ...(isUsingRemix
                ? [
                    'meta',
                    'links',
                    'headers',
                    'loader',
                    'action',
                  ]
                : []),
            ],
          },
        ],

        // recommended rules from @eslint-react
        'react/ensure-forward-ref-using-ref': 'warn',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'off',
        'react/no-children-count': 'warn',
        'react/no-children-for-each': 'off',
        'react/no-children-map': 'off',
        'react/no-children-only': 'warn',
        'react/no-children-prop': 'warn',
        'react/no-children-to-array': 'off',
        'react/no-clone-element': 'off',
        'react/no-comment-textnodes': 'warn',
        'react/no-component-will-mount': 'error',
        'react/no-component-will-receive-props': 'error',
        'react/no-component-will-update': 'error',
        'react/no-create-ref': 'error',
        'react/no-direct-mutation-state': 'error',
        'react/no-duplicate-key': 'error',
        'react/no-implicit-key': 'error',
        'react/no-missing-key': 'off',
        'react/no-nested-components': 'off',
        'react/no-redundant-should-component-update': 'error',
        'react/no-set-state-in-component-did-mount': 'warn',
        'react/no-set-state-in-component-did-update': 'warn',
        'react/no-set-state-in-component-will-update': 'warn',
        'react/no-string-refs': 'error',
        'react/no-unsafe-component-will-mount': 'warn',
        'react/no-unsafe-component-will-receive-props': 'warn',
        'react/no-unsafe-component-will-update': 'warn',
        'react/no-unstable-context-value': 'off',
        'react/no-unstable-default-props': 'off',
        'react/no-unused-class-component-members': 'warn',
        'react/no-unused-state': 'warn',
        'react/no-useless-fragment': 'off',
        'react/prefer-destructuring-assignment': 'off',
        'react/prefer-shorthand-boolean': 'warn',
        'react/prefer-shorthand-fragment': 'warn',

        ...isTypeAware
          ? {
              'react/no-leaked-conditional-rendering': 'warn',
            }
          : {},

        // overrides
        ...overrides,
      },
    },
  ]
}
