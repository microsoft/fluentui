# @fluentui/react-input

**React Input components for [Fluent UI React](https://react.fluentui.dev)**

Inputs give people a way to enter and edit text.

### Usage

Import Input:

```js
import { Input } from '@fluentui/react-components';
```

#### Examples

```jsx
<Input defaultValue="Hello, World!" />
<Input value={value} onChange={onInputChange} />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-input` from the list.

### Specification

See [Spec.md](./Spec.md)

### Upgrade Guide

If you're upgrading to Fluent UI v9 see the upgrade guide in [Storybook](https://react.fluentui.dev/) under Concepts > Upgrading.

## Opt-in CSS Modules styles

The `use*Styles.styles.css` modules beside the existing Griffel hooks provide opt-in,
layered CSS alternatives with the same exports. Configure the bundler to replace
`.styles` with `.styles.css.ts` for source imports and `.styles.js` with
`.styles.css.js` for built imports. Load CSS Modules as default class-name maps and
retain the package CSS assets. Default component imports still use Griffel.
Composed components require their own style alternatives; this does not remove
all reachable Griffel dependencies. Browser, forced-colors, RTL, and visual-regression
parity must be validated before switching defaults.
