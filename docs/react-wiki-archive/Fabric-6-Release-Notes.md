Welcome to the 6.0 release of Office UI Fabric React. Version 6.0 is a mostly
incremental release, but still has a few breaking changes that we wanted to
get out as soon as possible. Primarily this release takes a min-bar dependency
on React 16, which will enable us to more easily clean up the API surface to
be compatible with React 16+ strict mode.

In addition we've adjusted a number of things to take full advantage of
Webpack 4 tree shaking. This will definitely help with our never ending quest
to keep bundle sizes managable.

In this release we've tried to minimize the number of changes to keep it
straightforward for upgrading. There are a lot of things we would like to
include in the release, such as gutting out legacy deprecated props. We will
be focused on a full overhaul of the api surface in 7.0 to remove deprecated
props and to overall increase consistency, predictability, and robustness in
the components.

...and now some details about the new 6.0 features:

## Webpack tree shaking!

We are excited to announce officially supporting tree shaking. This means that
assuming you use Webpack 4 or above, you can now import things directly from
the `office-ui-fabric-react` package without memorizing top level imports.
Webpack will tree shake out everything you don't use, which creates much
smaller bundles!

In order to make tree shaking work, webpack must consume ES6 modules. And
since current Fabric consumers use `/lib/` imports, we needed to adjust the
output folders within the repo:

#### `/lib/`

ES6 modules (was commonjs). The `/lib-es2015` folder no longer
exists, so make sure to clean up aliases if you were using them.

#### `/lib-commonjs/`

If you refer to fabric components in unit tests via Jest,
you may need to alias the `/lib/` imports to to `/lib-commonjs`. Or use Babel.

Note: To resolve commonjs modules in Jest, you can use this config blurb in
your `jest.config.js`:

```js
  moduleNameMapper: {
    "office-ui-fabric-react/lib/(.*)$": "office-ui-fabric-react/lib-commonjs/$1"
  },
```

#### `/lib-amd/`

AMD modules. If you still need AMD, it is important to note another subtlety:
when we import one package from another, we must import from package based
imports (e.g. `import {...} from '@uifabric/utilities'`) rather than file
based imports (`import {...} from '@uifabric/utilities/lib/index'`.) This
allows Webpack to consume the `module` entry in package.json, and node.js to
consume the `main` entry for resolving where the corresponding consumable
modules are.

### Caveats

Note that the consuming app must be using Webpack 4 AND having app code use
ES6 modules in order to benefit from tree-shaking. In addition, other libraries
that are not ES6 modules based (such as React and ReactDOM) should be externalized.

## React 16

A number of changes were introduced in 16.3+ that we'd like to take full advantage
of:

1. Portals. We have updated the 5.0 release to use portals, but it has added a
   large batch of duplicated code. We can remove that code.

2. createRef. We love the new createRef API so much, we polyfilled it in 5.0.
   We can now remove that, reducing bundle size.

3. forwardRef. This has been a painpoint in React for a long long time, and
   has caused us to do unnatural things in the API such as introducing
   `componentRef`, and adding utilities in our `BaseDecorator` base class for
   hoisting memebers. All of this can now be updated.

4. Official context api! We use context in a number of places today, mostly
   for pushing the theme through the API surface. Now with a formal context
   api surface, we should be using it where it makes sense.

5. New lifetime methods. Right now we are using a number of deprecated methods
   in places. We want to clean these up, but also take advantage of the new
   React methods like `getDerivedStateFromProps` and
   `getSnapshotBeforeUpdates`.

If we were still supporting older versions of React, it would create a lot of
friction and bloat for all partners for us to try and work around these new
ways of doing things, especially for things that are difficult to polyfill.

## Rewritten CommandBar

The CommandBar component is one of the most popular components in Fabric but
has long suffered from bloat and rigidity. The complex resizing logic used to
move surplus items into the overflow menu was customized to the component
making it impossible to reuse, and overriding the styles and functionality of
the menu items was difficult and cumbersome.

Therefore, CommandBar has been completely rewritten from top to bottom using
newer, modular components like OverflowSet, ResizeGroup and CommandBarButton.
This makes it easier to customize and theme with only minor breaking interface
changes.

## Breaking changes

### Components

- All: Components with `getStyles` property had the property renamed to `styles`
  which now either takes in a style object or a function. (#4844)
- Checkbox: Replaced optional properties of the `ICheckboxStyles` interface,
  removed `getClassNames` from the `ICheckboxProps` interface, in favor of `styles`.
  (#4748)
- ChoiceGroup: All props are now input only.
- CommandBar: Moved experimental Command Bar into release.
- ContextualMenu: Removed deprecated (back in v0.69.0 of OUFR) `icon` prop
  from `IContextualMenuItem`. Use `iconProps: { iconName: 'SomeIcon' }`
  instead. (#4779)
- Label: Interface improvements. (#4745)
- Toggle: Interface improvements. (#4745)

### Utilities

- Selection utility: getSelectedIndices is now a mandatory member of the
  `ISelection` interface. (#4558)
- Positioning utility: Remove all deprecated props of the positioning utility
  and usages of these props. (#4790)

## Other fixes and changes

### Components

- BaseButton: Make adjustment so that custom class names has precedence. [4073361]
- Checkbox: Checkmark is visible on hover, supports high contrast styles. (#4748)
- ChoiceGroup: Supports custom styling.
- CommandBar: Supports custom styling and button aliasing.
- CommandBar: Add aria label and change to single tab stop.
- CommandBarButton: Fixed high contrast hover state. (#4738)
- ContextualMenu: Deprecate 'name' prop in favor of more consistent 'text' prop. (#4862)
- DetailsList: `fieldName` is now an optional field of `IColumn`. [32bc5dc]
- Label: Supports custom styling and aliased root. (#4745)
- Toggle: Supports custom styling and aliased root. (#4745)

### Utilities

- Positioning utility: correctly position callout without beak. (#4841)

## Breaking changes since the 6.0 release

### Components

- ResizeGroup: Remove classNamesFunction to reduce bundle size when using the component alone (#6389)
- Dropdown: directionHintFixed now defaults to false to better mirror standard HTML behavior (#5771)
