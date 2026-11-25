In addition to the standard [development practice](https://github.com/microsoft/fluentui/wiki/Development-Workflow), it is sometimes useful to run a local app against the introduced changes within the library, for instance, when trying to repro a bug locally, etc. This guide walks through the setup using Yarn 4's path-based linking.

## The scenario

Suppose you've just done some changes to how the `PrimaryButton` component behaves, and you'd like to test it in your custom local React app, in addition to running suitable `fluentui` tests, etc. For the sake of argument, let's pretend the projects are laid out as follows:

```
common_root
 \
  | -- fluentui (this repo with your changes)
  |
  | -- app (React TS app)
```

The app can be any React app. For simplicity, we'll assume you've used the standard bootstrap tooling such `create-react-app` like so:

```
$ npx create-react-app app --template typescript
```

and in `src/index.tsx` you've something along the lines of:

```typescript
import { render } from 'react-dom';
import { PrimaryButton } from '@fluentui/react';

// ...

render(<PrimaryButton />, document.getElementById('content'));
```

Normally, you'd add `@fluentui/react` to your project using `yarn add <package>`. However, since we want to test our local changes to the `fluentui` package, this will not be sufficient. This is where `yarn link` saves the day.

## The solution

Yarn 4 supports path-based linking directly, without a global link registry. From the `app` directory, point Yarn at the local package source:

```bash
$ cd app
$ yarn link ../fluentui/packages/react
```

This records the local path for `@fluentui/react` in `app/package.json` under `resolutions` using Yarn's
[`portal:` protocol](https://yarnpkg.com/protocol/portal) and installs the link. The package is now resolved from your
local `fluentui/packages/react` directory — no separate registration step needed in the library.

> **Warning:** If you encounter a [React "Rules of Hooks" error](https://reactjs.org/warnings/invalid-hook-call-warning.html), both projects are loading separate copies of `react`. Yarn 4 path linking preserves the consuming app's peer dependency resolution, so the linked package should resolve `react` through the app's own `node_modules`. If the error still occurs, verify that the app and the linked package declare compatible `react` peer versions. Do not add self-referential `link:./node_modules/react` resolutions — they are circular and unreliable.

With this done, you should be able to successfully run the app:

```bash
$ yarn start
```

## Unlinking

To restore the original published version, remove the entry `yarn link` added for `@fluentui/react` from the `resolutions` field in `app/package.json`, then reinstall:

```bash
$ cd app
$ yarn install
```

## Development workflow

Now, whenever you make tweaks to the `fluentui` lib, you simply need to rebuild it via:

```bash
$ cd fluentui
$ yarn nx run react:build
```

And the changes should be automatically picked up by the `app`.
