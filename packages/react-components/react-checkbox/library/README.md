# @fluentui/react-checkbox

**Checkbox component for [Fluent UI React](https://react.fluentui.dev/)**

Checkboxes give people a way to select one or more items from a group, or switch between
two mutually exclusive options (checked or unchecked).

### Usage

Import Checkbox:

```js
import { Checkbox } from '@fluentui/react-components';
```

#### Examples

```jsx
<Checkbox label="Default checkbox" />
<Checkbox disabled label="Disabled" />
<Checkbox shape="circular" label="Circular" />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-checkbox` from the list.

### Specification

See [Spec.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Checkbox implementation.

## Opt-in CSS Modules styles

The `use*Styles.styles.css` modules beside the existing Griffel hooks provide opt-in,
layered CSS alternatives with the same exports. Configure the bundler to replace
`.styles` with `.styles.css.ts` for source imports and `.styles.js` with
`.styles.css.js` for built imports. Load CSS Modules as default class-name maps and
retain the package CSS assets. Default component imports still use Griffel.
Composed components require their own style alternatives; this does not remove
all reachable Griffel dependencies. Browser, forced-colors, RTL, and visual-regression
parity must be validated before switching defaults.

Select the CSS Modules alternative for the composed `Label` as well; mixing a layered parent with an unlayered Griffel child can change the label cascade.
