import { ensurePackages, interopDefault } from '../utils'
import type { OptionsTailwindCSS, TypedFlatConfigItem } from '../types'

export async function tailwindcss(
  options: OptionsTailwindCSS = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    settings = {},
  } = options

  await ensurePackages([
    'eslint-plugin-tailwindcss',
  ])

  const [
    pluginTailwindCSS,
  ] = await Promise.all([
    interopDefault(import('eslint-plugin-tailwindcss')),
  ] as const)

  return [
    {
      name: 'nyxb/tailwindcss',
      plugins: {
        tailwindcss: pluginTailwindCSS,
      },
      rules: {
        'tailwindcss/classnames-order': 'warn',
      },
      settings: {
        tailwindcss: {
          callees: settings.callees || ['classnames', 'clsx', 'ctl'],
          classRegex: settings.classRegex || '^class(Name)?$',
          config: settings.config || 'tailwind.config.js',
          cssFiles: settings.cssFiles || ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
          cssFilesRefreshRate: settings.cssFilesRefreshRate || 5000,
          removeDuplicates: settings.removeDuplicates !== undefined ? settings.removeDuplicates : true,
          skipClassAttribute: settings.skipClassAttribute !== undefined ? settings.skipClassAttribute : false,
          tags: settings.tags || [],
          whitelist: settings.whitelist || [],
        },
      },
    },
  ]
}
