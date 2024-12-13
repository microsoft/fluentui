# @fluentui/eslint-plugin-react-components

**ESLint Plugin for [Fluent UI React Components](https://fluent2.microsoft.design/components/web/react)**

[![npm version](https://badge.fury.io/js/%40fluentui%2Feslint-plugin-react-components.svg)](https://badge.fury.io/js/%40fluentui%2Feslint-plugin-react-components)
[![Downloads](https://img.shields.io/npm/dm/@fluentui/eslint-plugin-react-components.svg)](https://www.npmjs.com/package/@fluentui/eslint-plugin-react-components)

## Overview

This ESLint plugin enforces best practices and coding standards for Fluent UI React Components. It helps developers:

- Maintain consistency across Fluent UI React components
- Catch common mistakes and anti-patterns early
- Ensure accessibility standards are met
- Follow Microsoft's design guidelines

## Installation

Install the plugin using your preferred package manager:

```bash
# npm
npm install --save-dev @fluentui/eslint-plugin-react-components

# yarn
yarn add --dev @fluentui/eslint-plugin-react-components

# pnpm
pnpm add --save-dev @fluentui/eslint-plugin-react-components
```

## Usage

1. Add the plugin to your `.eslintrc.js` or equivalent configuration file:

```js
module.exports = {
  plugins: ['@fluentui/react-components'],
  extends: ['plugin:@fluentui/react-components/recommended'],
};
```

1. Or configure individual rules manually:

```js
module.exports = {
  plugins: ['@fluentui/react-components'],
  rules: {
    '@fluentui/react-components/rule-name-1': 'error',
    '@fluentui/react-components/rule-name-2': 'warn',
  },
};
```

## Available Rules

TBD

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
