# @fluentui/react-divider

**Divider components for [Fluent UI](https://react.fluentui.dev/)**

The Divider component represents a visual separator, that may contain content. A Divider can be vertical or horizontal.

## Usage

To import Divider:

```js
import { Divider } from '@fluentui/react-components';
```

### Examples

```jsx
<Divider />
<Divider>This is a divider</Divider>
<Divider alignContent="center">This is a divider</Divider>
<Divider appearance="subtle">This is a divider</Divider>
<Divider inset>This is a divider</Divider>
<Divider vertical>This is a divider</Divider>
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-divider` from the list.

### Specification

See [SPEC.md](./SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Divider implementation.

## Opt-in CSS Modules styles

The `use*Styles.styles.css` modules beside the existing Griffel hooks provide opt-in,
layered CSS alternatives with the same exports. Configure the bundler to replace
`.styles` with `.styles.css.ts` for source imports and `.styles.js` with
`.styles.css.js` for built imports. Load CSS Modules as default class-name maps and
retain the package CSS assets. Default component imports still use Griffel.
Composed components require their own style alternatives; this does not remove
all reachable Griffel dependencies. Browser, forced-colors, RTL, and visual-regression
parity must be validated before switching defaults.
