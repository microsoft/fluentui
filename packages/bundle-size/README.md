## `@fluentui/bundle-size`

A CLI tool to measure bundle size locally and on CI.

> NOTE: `bundle-size` requires to build packages first before doing any kind of measurements. Make sure to accommodate this in your pipeline\*\*

### Usage

#### Fixtures

Fixtures declare exports that should be measured by the `bundle-size` tool. Fixtures are created inside each package.

For example:

```js
import { Component } from '@fluentui/react-component';

console.log(Component);
// 👆 "console.log()" is the easiest way to prevent tree-shaking

export default {
  name: 'Component',
  // 👆 defines a name for story that will be used in output
};
```

### Configuration

For custom advanced behavior of `bundle-size`, you can create a `bundle-size.config.js` in the root of your project directory (next to `package.json`).

```
my-proj/
├─ src/
├─ bundle-size.config.js
├─ node_modules/
├─ bundle-size/
│  ├─ Fixture.fixture.js
├─ package.json
```

A global configuration can also be used for monorepo scenarios

```
my-proj-a/
├─ src/
├─ node_modules/
├─ bundle-size/
│  ├─ Fixture.fixture.js
├─ package.json
my-proj-b/
├─ src/
├─ node_modules/
├─ bundle-size/
│  ├─ Fixture.fixture.js
├─ package.json
bundle-size.config.js

```

```js
const path = require('path');

module.exports = {
  webpack: config => {
    // customize config here
    return config;
  },
};
```

### Commands

#### `measure`

```sh
yarn bundle-size measure [--verbose]
```

Builds fixtures and produces artifacts.

For each fixture:

- `[fixture].fixture.js` - a modified fixture without a default export, used by a bundler
- `[fixture].output.js` - a partially minified file, useful for debugging
- `[fixture].min.js` - a fully minified file, used for measurements

A report file `bundle-size.json` that is used by other steps.
