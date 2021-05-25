## `@fluentui/bundle-size`

A CLI tool to measure bundle size locally and on CI.

> NOTE: `bundle-size` requires to build packages first before doing any kind of measurements. Make sure to accommodate this in your pipeline

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

### Commands

#### `measure`

```sh
yarn bundle-size measure [--quiet]
```

Builds fixtures and produces artifacts. For each fixture:

- `[fixture].fixture.js` - a modified fixture without a default export, used by a bundler
- `[fixture].output.js` - a partially minified file, useful for debugging
- `[fixture].min.js` - a fully minified file, used for measurements

A report file `bundle-size.json` that is used by other steps.

#### `upload-report`

```sh
yarn bundle-size measure --branch=main --commit-sha=HASH [--quiet]
```

Aggregates local results to a single report and uploads data to Azure Table Storage.

> NOTE: should be called only during CI builds.
