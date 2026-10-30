# @fluentui/react-switch

**Switch components for [Fluent UI React](https://react.fluentui.dev/)**

The `Switch` control enables users to trigger an option on or off through interacting with the component.

## Usage

To import Switch:

```js
import { Switch } from '@fluentui/react-components';
```

### Examples

```jsx
<Switch />
<Switch defaultChecked required />
<Switch checked onChange={onChange} />
<Switch disabled />
<Switch label="Enable dark mode" labelPosition="after" />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-switch` from the list.

### Specification

See [SPEC.md](./Spec.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Switch implementation.

## Opt-in CSS Modules styles

CSS Modules alternatives are available for `Switch`. The default exports and component imports continue to use Griffel.

To opt in, configure your bundler to replace each `use<Component>Styles.styles.js` module with its adjacent `use<Component>Styles.styles.css.js` alternative (or `.styles.ts` with `.styles.css.ts` for source builds). Apply the replacement consistently to client and server bundles. The CSS loader must provide a default class-name map and retain the adjacent `.module.css` asset, including CSS from dependencies. All component rules are in `@layer fluentui` and use the theme custom properties supplied by `FluentProvider`.

For composed labels, also select the CSS Modules alternative for `@fluentui/react-label`. Mixing its default unlayered Griffel styles with these layered alternatives can override label typography.
