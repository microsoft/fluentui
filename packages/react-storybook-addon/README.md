# @fluentui/react-storybook-addon

**Storybook addon for Fluent UI React [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**

These are not production-ready components and **should never be used in product**. This space is useful for testing new components whose APIs might change before final release.

## ✨ Features

**Toolbar/Tools**

- enables react strict mode per story
  - ![React Strict Mode Tool](https://user-images.githubusercontent.com/1223799/128166501-aeb01715-8379-460f-b1a9-818871a10864.png)
- adds fluent theme switcher
  - ![Fluent Theme Switcher](https://user-images.githubusercontent.com/1223799/128166633-bd6a7ad3-fe1a-438c-823c-228a4d3dcf09.png)

## Getting Started

### Installation

> **NOTE:** this package is not being published yet

```sh
yarn add -D @fluentui/react-storybook-addon
```

### Configuration

Add following content to .storybook/main.js:

```js
module.exports = {
  addons: ['@fluentui/react-storybook-addon'],
};
```

## Development

1. Run inner loop from monorepo root `yarn workspace @fluentui/react-storybook-addon storybook`

   - > 💡 this will run `build` script that compiles addon implementation so it can be consumed by local storybook

2. Every time you do any change to implementation, after you ran your local storybook you'll need to manually run `yarn workspace @fluentui/react-storybook-addon build` to reflect those changes
