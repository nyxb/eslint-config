[![cover][cover-src]][cover-href]

[![npm version][npm-version-src]][npm-version-href] 
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![code style](https://nyxb.blog/badges/badge-code-style.svg)](https://github.com/nyxb/eslint-config)
[![License][license-src]][license-href]

# @nyxb/eslint-config

- ✨ Single quotes, no semi
- 🛠️ Auto fix for formatting (aimed to be used standalone without Prettier)
- 🎯 Designed to work with TypeScript, React, Nextjs and Vue out-of-box
- 🔍 Lint also for json, yaml, markdown
- 🧩 Sorted imports, dangling commas
- 🏆 Reasonable defaults, best practices, only one-line of config
- 🚀 [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- 🎨 Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- 📖 Style principle: Minimal for reading, stable for diff
- ⏩ Indentation: 3 spaces/tab (to end the eternal fight 2v4. 3 is the best)

## 🚀 Usage

### 📥 Install

```bash
pnpm add -D eslint @nyxb/eslint-config
```

### ⚙️ Create config file

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import nyxb from '@nyxb/eslint-config'

export default nyxb()
```

With CJS:

```js
// eslint.config.js
const nyxb = require('@nyxb/eslint-config').default

module.exports = nyxb()
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

### ➕ Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### ✨ Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `settings.json`:

```jsonc
{
  // Enable the flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": false
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off" },
    { "rule": "style*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // The following is optional.
  // It's better to put under project setting `.vscode/settings.json`
  // to avoid conflicts with working with different eslint configs
  // that does not support all formats.
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml"
  ]
}
```

## 🎨 Customization

Since v1.0, we migrated to [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new). It provides much better organization and composition.

Normally you only need to import the `nyxb` preset:

```js
// eslint.config.js
import nyxb from '@nyxb/eslint-config'

export default nyxb()
```

And that's it! Or you can configure each integration individually, for example:

```js
// eslint.config.js
import nyxb from '@nyxb/eslint-config'

export default nyxb({
  stylistic: true, // enable stylistic formatting rules
  typescript: true,
  vue: true,
  jsonc: false, // disable jsonc support
  yaml: false,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    './fixtures',
    // ...globs
  ]
})
```

The `nyxb` factory function also accepts any number of arbitrary custom config overrides:

```js
// eslint.config.js
import nyxb from '@nyxb/eslint-config'

export default nyxb(
  {
    // Configures for nyxb's config
  },

  // From the second arguments they are ESLint Flat Configs
  // you can have multiple configs
  {
    files: ['**/*.ts'],
    rules: {},
  },
  {
    rules: {},
  },
)
```

Going more advanced, you can also import fine-grained configs and compose them as you wish:

```js
// eslint.config.js
import {
  comments,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsonc,
  markdown,
  node,
  sortPackageJson,
  sortTsconfig,
  stylistic,
  typescript,
  unicorn,
  vue,
  yml,
} from '@nyxb/eslint-config'

export default [
  ...ignores(),
  ...javascript(),
  ...comments(),
  ...node(),
  ...jsdoc(),
  ...imports(),
  ...unicorn(),
  ...typescript(),
  ...stylistic(),
  ...vue(),
  ...jsonc(),
  ...yml(),
  ...markdown(),
]
```

Check out the [configs](https://github.com/nyxb/eslint-config/blob/main/src/configs) and [factory](https://github.com/nyxb/eslint-config/blob/main/src/factory.ts) for more details.

### 🚀  Plugins Renaming
Since flat config requires us to explicitly provide the plugin names (instead of mandatory convention from npm package name), we renamed some plugins to make overall scope more consistent and easier to write.

| Original Prefix | New Prefix | Source Plugin |
| --------------- | ---------- | ------------- |
| `i/*` | `import/*` | [eslint-plugin-i](https://github.com/un-es/eslint-plugin-i) |
| `n/*` | `node/*` | [eslint-plugin-n](https://github.com/eslint-community/eslint-plugin-n) |
| `@typescript-eslint/*` | `ts/*` | [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) |
| `@stylistic/js/*` | `style/*` | [@stylistic/eslint-plugin-js](https://github.com/eslint-stylistic/eslint-stylistic) |
| `@stylistic/ts/*` | `style-ts/*` | [@stylistic/eslint-plugin-ts](https://github.com/eslint-stylistic/eslint-stylistic) |
| `@next/next/*` | `next/*` | [eslint-plugin-next](https://www.npmjs.com/package/eslint-plugin-next) |
| `test/*` | `vitest/*` | [eslint-plugin-vitest](https://github.com/veritem/eslint-plugin-vitest) |
| `test/*` | `no-only-tests/*` | [eslint-plugin-no-only-tests](https://github.com/levibuzolic/eslint-plugin-no-only-tests) |

When you want to overrides rules, or disable them inline, you need to update to the new prefix:

```diff
-// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
+// eslint-disable-next-line ts/consistent-type-definitions
type foo = { bar: 2 }
```


### 🚀 Type Aware Rules

### Type Aware Rules

You can optionally enable the [type aware rules](https://typescript-eslint.io/linting/typed-linting/) by passing the options object to the `typescript` config:

```js
// eslint.config.js
import nyxb from '@nyxb/eslint-config'

export default nyxb({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

### 🚀 Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
npm i -D lint-staged simple-git-hooks
```

## Badge

If you enjoy this code style, and would like to mention it in your project, here is the badge you can use:

```md
[![code style](https://nyxb.blog/badges/badge-code-style.svg)](https://github.com/nyxb/eslint-config)
```

[![code style](https://nyxb.blog/badges/badge-code-style.svg)](https://github.com/nyxb/eslint-config)

## 📚 FAQ

### 🦋 Prettier?

[Why I don't use Prettier](https://dev.to/nyxb/prettier-a-double-edged-sword-for-code-formatting-29o9)

### 🔍 How to lint CSS?

I use [styled-components](https://styled-components.com) and lint it with [stylelint](https://stylelint.io/) here is my [stylelint-config](https://github.com/nyxb/stylelint-config).

### 3 indent?
[Why 3 indent is the best](https://dev.to/nyxb/welcome-to-the-magical-world-of-indentation-1fc)

### 😍 I prefer XXX...

Sure, you can config and override rules locally in your project to fit your needs. If that still does not work for you, you can always fork this repo and maintain your own.

Or you can always fork this repo and make your own.

## 🔎 Check Also

- [nyxb/dotfiles](https://github.com/nyxb/dotfiles) - My dotfiles
- [nyxb/vscode-settings](https://github.com/nyxb/vscode-settings) - My VS Code settings

## 📜 License

[MIT](./LICENSE) 💚 License © 2023 [Dennis Ollhoff](https://github.com/nyxb)

<!-- Background -->

[cover-src]: https://raw.githubusercontent.com/nyxb/eslint-config/main/.github/assets/cover-github.png
[cover-href]: https://reactchemy.com

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@nyxb/eslint-config?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/@nyxb/eslint-config
[npm-downloads-src]: https://img.shields.io/npm/dm/@nyxb/eslint-config?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package@nyxb/eslint-config
[license-src]: https://img.shields.io/github/license/nyxb/eslint-config.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxb/eslint-config/blob/main/LICENSE
