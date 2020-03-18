# CONTRIBUTING

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [Useful Commands](#useful-commands)
- [Workflow](#workflow)
- [Accessibility](#accessibility)
  - [Role and aria props](#role-and-aria-props)
  - [Focus](#focus)
  - [Keyboard handling](#keyboard-handling)
- [Packages](#packages)
  - [Add a new package](#add-a-new-package)
    - [Run `lerna create`](#run-lerna-create)
    - [Update `package.json`](#update-packagejson)
    - [Create `tsconfig.json`](#create-tsconfigjson)
    - [Create `jest.config.js`](#create-jestconfigjs)
    - [Run `syncpack format`](#run-syncpack-format)
  - [Add a new dependency](#add-a-new-dependency)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

Make sure you have [Node.js][1] version v8 or later installed.

You can contribute to Fluent UI by being an official [contributor](setup-local-development.md#contributors) or without permissions, as a [collaborator](setup-local-development.md#collaborators)

### Useful Commands

> This list contains the most useful commands. You should run `yarn run` to see all scripts.

```sh
yarn start                 // run doc site

yarn test                  // test once
yarn test:watch            // test on file change

yarn build                 // build everything, will run `gulp build`
yarn build:dist            // build dist
yarn build:docs            // build docs

yarn deploy:docs           // deploy gh-pages doc site

yarn lint                  // lint once
yarn lint:fix              // lint and attempt to fix

yarn prettier              // `prettier --list-different "**/*.{ts,tsx}"`
yarn prettier:fix          // prettier and attempt to fix

yarn ci                    // lint, prettier and test
```

## Workflow

These guides will walk your through various activities for contributing:

- [Setup Local Development](setup-local-development.md)
- [Add a feature](add-a-feature.md)
- [Test a feature](test-a-feature.md)
- [Document a feature](document-a-feature.md)
- [Release a new package version](release-a-package.md)

## Accessibility

Fluent UI implements accessibility using accessibility behaviors. The behaviors add attributes to the DOM elements (mainly role and aria-\* properties) as well as handle keyboard interaction and focus. Every accessible component has a default behavior, which can be overridden using the `accessibility` prop. You can choose a behavior from the ones provided by Fluent UI or you can implement a new behavior.

Behaviors apply properties, focus handling and keyboard handlers to the component slots. When developing a component, the properties and keyboard handlers need to be spread to the corresponding slots.

For complete accessibility contributing guide, requirements and testing, see [Accessibility][2]

- [Role and aria props](#role-and-aria-props)
- [Focus](#focus)
- [Keyboard handling](#keyboard-handling)

### Role and aria props

ARIA [roles][3] and [attributes][4] provide necessary semantics for assistive technologies that allow persons with disabilities to navigate in the page/application.

In addition to behaviors, ARIA [landmarks][5] and [naming props][6] need to be added to the components/elements to form the page structure and provide textual information.

For example, to make an icon-only Button accessible, `aria-label` prop needs to be used:

```html
<button icon="star" iconOnly aria-label="Favorites" primary />
```

### Focus

An application should always have an element with [focus][7] when in use. The user can change the focused element by:

- pressing TAB/shift+TAB keys to navigate through the components
- pressing arrow keys to navigate through children (for example menu items in menu)
- using the screen reader with or without virtual cursor

Fluent UI uses Office UI Fabric [FocusZone][8] for basic TAB and arrow key focus handling. To use the focus zone, you can use the `focusZone` configuration in the behavior (for example see [MenuItemBehavior][9]).

Focused component needs to be clearly visible. This is handled in Fluent UI by focus indicator functionality. Focus indicator will be displayed only if the application is in keyboard mode. Application switches to keyboard mode when a key relevant to navigation is pressed. It disables keyboard mode on mouse click events.

To style the focused component, you can use the `isFromKeyboard` utility and prop. See [Button component][10] and [Button style][11] for reference.

### Keyboard handling

In addition to basic focus handling, specific keyboard handlers can be added to the behaviors. These keyboard handlers call actions defined in the components, when corresponding keys are pressed by the user. For reference, see `keyActions` in [MenuItemBehavior][12] and `actionHandlers` in [MenuItem component][13].

## Packages

We are using [Lerna][14] to manage our packages and [Yarn Workspaces][15] to link them.

### Add a new package

#### Run `lerna create`

You should to run `lerna create` command to create a new package

- we are using `@fluentui` namespace on NPM to publish our packages
- the directory name should not contain any namespace prefix and can be prefixed with the library name if the
  implementation is not framework agnostic
- please provide a meaningful description to a package in the matched field
- use `https://github.com/microsoft/fluent-ui-react/tree/master/packages/__DIRECTORY_NAME__` as `homepage`
- our packages are currently published with MIT license, please follow it until you will have specific legal requirements

```sh
lerna create @fluentui/react-proptypes react-proptypes
```

##### Example input

```
lerna notice cli v3.11.1
package name: (@fluentui/react-proptypes)
version: (0.21.1)
description: Set of custom reusable PropTypes for React components.
keywords:
homepage: https://github.com/microsoft/fluent-ui-react/tree/master/packages/react-proptypes
license: (ISC) MIT
entry point: (lib/react-proptypes.js)
git repository: (https://github.com/microsoft/fluent-ui-react.git)
```

#### Update `package.json`

After a package will be created we need to add necessary changes to a newly created `package.json`.
These changes are required to setup internal tooling and package publishing.

```diff
-  "directories": {
-    "lib": "lib",
-    "test": "__tests__"
-  },
-  "files": [
-    "lib"
-  ],
+  "jsnext:main": "dist/es/index.js",
+  "main": "dist/commonjs/index.js",
+  "module": "dist/es/index.js",
+  "types": "dist/es/index.d.ts",
+  "sideEffects": false,
+  "files": [
+    "dist"
+  ],
```

```diff
-  "scripts": {
-    "test": "echo \"Error: run tests from root\" && exit 1"
-  },
+  "scripts": {
+    "build": "gulp bundle:package:no-umd"
+  },
```

You can also use `gulp bundle:package` to bundle your package with UMD.

#### Create `tsconfig.json`

If your package uses TypeScript, please also create a new `tsconfig.json` and place it in `packages/__DIRECTORY_NAME__`. An example config:

```json
{
  "extends": "../../build/tsconfig.common",
  "include": ["src", "test"]
}
```

This config will extend a common TS config that is used in all packages. You can add specific options for the package here.

#### Create `jest.config.js`

If your package uses Jest for unit tests, please also create a new `jest.config.js` and place and place it in `packages/__DIRECTORY_NAME__`. An example config:

```js
module.exports = {
  ...require('@fluentui/internal-tooling/jest'),
  name: '__DIRECTORY_NAME__'
};
```

#### Run `syncpack format`

Organise a new `package.json` according to a conventional format, where fields appear in a predictable order and
nested fields are ordered alphabetically.

```
yarn syncpack format
```

### Add a new dependency

Please always use [`lerna add`][16] to manage all dependencies including internal packages. The command bellow will add
`@fluentui/react-proptypes` as production dependency to the `@fluentui/react-northstar` package.

```yarn
lerna add @fluentui/react-proptypes packages/react
```

[1]: https://nodejs.org/
[2]: https://github.com/stardust-ui/accessibility/blob/master/CONTRIBUTING.md
[3]: https://www.w3.org/TR/wai-aria-1.1/#usage_intro
[4]: https://www.w3.org/TR/wai-aria-1.1/#introstates
[5]: https://www.w3.org/TR/wai-aria-1.1/#landmark_roles
[6]: https://www.w3.org/TR/wai-aria-1.1/#namecalculation
[7]: https://www.w3.org/TR/wai-aria-1.1/#managingfocus
[8]: https://developer.microsoft.com/en-us/fabric#/components/focuszone
[9]: https://github.com/microsoft/fluent-ui-react/blob/master/packages/react/src/utils/accessibility/Behaviors/Menu/MenuBehavior.ts
[10]: https://github.com/microsoft/fluent-ui-react/blob/master/src/components/Button/Button.tsx
[11]: https://github.com/microsoft/fluent-ui-react/blob/master/src/themes/teams/components/Button/buttonStyles.ts
[12]: https://github.com/microsoft/fluent-ui-react/blob/master/packages/react/src/utils/accessibility/Behaviors/Menu/MenuItemBehavior.ts
[13]: https://github.com/microsoft/fluent-ui-react/blob/master/src/components/Menu/MenuItem.tsx
[14]: https://lerna.js.org
[15]: https://yarnpkg.com/en/docs/workspaces
[16]: https://github.com/lerna/lerna/tree/master/commands/add
