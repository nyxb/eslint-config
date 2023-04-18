<p align="center">
<img src="https://github.com/nyxb/eslint-config/blob/main/.github/assets/cover-github_black.png.png#gh-light-mode-only">
<img src="https://github.com/nyxb/eslint-config/blob/main/.github/assets/cover-github_light.png#gh-dark-mode-only">
</p>

<a href="https://www.npmjs.com/package/@nyxb/eslint-config"><img src="https://img.shields.io/npm/v/@nyxb/eslint-config.svg?style=flat&colorA=18181B&colorB=14F195" alt="Version"></a>

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Nextjs, Vue out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config
- **Style principle**: Minimal for reading, stable for diff

## Usage

### Install

```bash
pnpm add -D eslint @nyxb/eslint-config
```

### Config `.eslintrc`

```json
{
  "extends": "@nyxb"
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env. 

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: '@nyxb'
}
```

### Lint Staged

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

## FAQ

Prettier?
[Why I don't use Prettier](https://dev.to/nyxb/prettier-a-double-edged-sword-for-code-formatting-29o9)

### How to lint CSS?

If you still prefer CSS, you can use [stylelint](https://stylelint.io/) for CSS linting.
### I prefer XXX...

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

## Check Also

- [nyxb/dotfiles](https://github.com/nyxb/dotfiles) - My dotfiles
- [nyxb/vscode-settings](https://github.com/nyxb/vscode-settings) - My VS Code settings
- [nyxb/ts-starter](https://github.com/nyxb/ts-starter) - My starter template for TypeScript library


## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Dennis Ollhoff](https://github.com/nyxb)
