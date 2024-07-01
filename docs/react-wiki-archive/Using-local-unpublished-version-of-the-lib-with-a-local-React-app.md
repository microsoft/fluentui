In addition to the standard [development practice](https://github.com/microsoft/fluentui/wiki/Development-Workflow), it is sometimes useful to run a local app against the introduced changes within the library, for instance, when trying to repro a bug locally, etc. In this case, `yarn link` tool comes in real handy, and this short guide will take you through the full setup to get you up and running.

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

Normally, you'd add `@fluentui/react` to your project using `yarn add <package>`. However, since we want to test our local changes to the `fluentui` package, this will not be sufficient. This is where `yarn link` saves the day. `yarn link` creates a symlink to your local package inside the `node_modules` directory, however, at the same time, it doesn't add the dependency to the `package.json` file. Having said that, you can still import the linked package as you'd normally do when adding a package from the npm registry. So no difference there. The trick is with the actual linking. We discuss this next.

## The solution

We want to link `@fluentui/react` as a dependency of the `app` package. To do this, we first of all need to add our local copy of `@fluentui/react` into `yarn`'s link registry. This can be done by navigating to the `fluentui` project and then into the appropriate package source directory, in this case, `react`, and invoking `yarn link`:

```
$ cd fluentui/packages/react
$ yarn link
yarn link v1.22.10
success Registered "@fluentui/react".
info You can now run `yarn link "@fluentui/react"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.04s.
```

OK, so we're halfway there. Now, from within the `app`'s root directory, we execute the hint given to us by `yarn link`, that is:

```
$ cd app
$ yarn link @fluentui/react
yarn link v1.22.10
success Using linked package for "@fluentui/react".
✨  Done in 0.04s.
```

After this is done, if you navigate into your `app`'s `node_modules` dir, you'll see that `@fluentui/react` is a symlink:

```
$ cd app/node_modules/@fluentui
$ ls -la react
lrwxr-xr-x  1 username  group  45 Jan 11 13:03 node_modules/@fluentui/react -> ../../../../.config/yarn/link/@fluentui/react
```

This symlink points to `yarn`'s local link-registry, which in turn dereferences to the `fluentui/packages/react` directory:

```
$ ls -la ~/.config/yarn/link/@fluentui/react
lrwxr-xr-x  1 username  group  39 Jan 11 11:56 ~/.config/yarn/link/@fluentui/react -> ../../../../common_root/fluentui/packages/react
```

In effect, you can think of it as:

```
common_root
 \
  | -- fluentui
  |     \
  |      | -- packages/react <---------|
  |                                    |
  | -- app                             |
        \                              |
         | -- node_modules/@fluentui/react
```

If you try running your app however, you will get greeted by a nasty looking [React error scolding you for violating the "Rules of Hooks"](https://reactjs.org/warnings/invalid-hook-call-warning.html). The good news is, we've not violated anything. The bad news is, the app will refuse to launch. It turns out, in addition to violating the "Rules of Hooks", this problem also surfaces when the two projects you want to link locally via symlink both add `react` and `react-dom` as dependencies. In such case, as prescribed by React, it is necessary to manually link in the same version of `react` and `react-dom` between the linked packages using `npm link <path>`, and is best done in the lib's `node_modules`:

```
$ cd fluentui
$ rm -rf fluentui/node_modules/react # please, be extremely careful when invoking rm with -rf flags!
$ rm -rf fluentui/node_modules/react-dom
$ npm link ../app/node_modules/react
$ npm link ../app/node_modules/react-dom
```

With this done, you should be able to successfully run the app:

```
$ yarn start
```

## Development workflow

Now, whenever you make tweaks to the `fluentui` lib, you simply need to rebuild it via:

```
$ cd fluentui
$ yarn buildto react
```

And the changes should be automatically picked up by the `app`.
