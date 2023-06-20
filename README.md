<p align="center">
<img src="https://github.com/nyxb/eslint-config/blob/main/.github/assets/cover-github_black.png.png#gh-light-mode-only">
<img src="https://github.com/nyxb/eslint-config/blob/main/.github/assets/cover-github_light.png#gh-dark-mode-only">
</p>

[![npm version][npm-version-src]][npm-version-href] 
[![npm downloads][npm-downloads-src]][npm-downloads-href] 
[![bundle][bundle-src]][bundle-href] 
[![License][license-src]][license-href]

# @nyxb/eslint-config

- ✨ Single quotes, no semi
- 🛠️ Auto fix for formatting (aimed to be used standalone without Prettier)
- 🎯 Designed to work with TypeScript, Nextjs, Vue out-of-box
- 🔍 Lint also for json, yaml, markdown
- 🧩 Sorted imports, dangling commas
- 🏆 Reasonable defaults, best practices, only one-line of config
- 📖 Style principle: Minimal for reading, stable for diff
- ⏩ Indentation: 3 spaces/tab (to end the eternal fight 2v4. 3 is the best)

## 🚀 Usage

### 📥 Install

```bash
pnpm add -D eslint @nyxb/eslint-config
```

### ⚙️ Config `.eslintrc`

```json
{
  "extends": "@nyxb"
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

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

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.tabSize": 3,
  "editor.insertSpaces": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### 🚀 TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env. 

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
   extends: '@nyxb'
}
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

## 📚 FAQ

Prettier?
[Why I don't use Prettier](https://dev.to/nyxb/prettier-a-double-edged-sword-for-code-formatting-29o9)

3 indent?
[Why 3 indent is the best](https://dev.to/nyxb/welcome-to-the-magical-world-of-indentation-1fc)

### 🔍 How to lint CSS?

I use [styled-components](https://styled-components.com) and lint it with [stylelint](https://stylelint.io/) here is my [stylelint-config](https://github.com/nyxb/stylelint-config).

### 😍 I prefer XXX...

Sure, you can override the rules in your `.eslintrc` file.

<!-- eslint-skip -->

```jsonc
{
  "extends": "@nyxb",
  "rules": {
    // your rules...
  }
}
```

Or you can always fork this repo and make your own.

## 🔎 Check Also

- [nyxb/dotfiles](https://github.com/nyxb/dotfiles) - My dotfiles
- [nyxb/vscode-settings](https://github.com/nyxb/vscode-settings) - My VS Code settings

## 🤝💰 Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/nyxb/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/nyxb/static/sponsors.png'/>
  </a>
</p>

## 📜 License

[MIT](./LICENSE) 💚 License © 2023 [Dennis Ollhoff](https://github.com/nyxb)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/ext-name?style=flat&colorA=18181B&colorB=14F195
[npm-version-href]: https://npmjs.com/package/ext-name
[npm-downloads-src]: https://img.shields.io/npm/dm/ext-name?style=flat&colorA=18181B&colorB=14F195
[npm-downloads-href]: https://npmjs.com/package/ext-name
[bundle-src]: https://img.shields.io/bundlephobia/minzip/ext-name?style=flat&colorA=18181B&colorB=14F195
[bundle-href]: https://bundlephobia.com/result?p=ext-name
[license-src]: https://img.shields.io/github/license/nyxb/ext-name.svg?style=flat&colorA=18181B&colorB=14F195
[license-href]: https://github.com/nyxb/ext-name/blob/main/LICENSE
