# @fluentui/react-spinner

**Spinner components for [Fluent UI React](https://react.fluentui.dev/)**

The Spinner is an outline of a circle which animates around itself indicating to the user that things are processing. Spinners are typically indeterminate progress indicators that is used when it is unknown how long a task will take to complete. They can be various sizes, located inline with content or centered. They generally appear while an action is being processed or committed. They are subtle and generally do not take up much space, but are transitions from the completed task.

## Usage

To import Spinner:

```js
import { Spinner } from '@fluentui/react-components';
```

### Examples

```js
<Spinner label="Loading..." />
<Spinner label="Loading..." appearance="inverted" />
<Spinner label="Loading..." size="large" />
```

See [Fluent UI Storybook](https://react.fluentui.dev/) for more detailed usage examples.

Alternatively, run Storybook locally with:

1. `yarn start`
2. Select `react-spinner` from the list.

#### Rendering Spinner without the animated circle

You can directly override the Spinner slot to render a Spinner without the animated circle, as shown below

```js
<Spinner spinner={null} appearance="primary" label="Primary Spinner" />
<Spinner spinner={{style:{visibility: 'hidden'}}} appearance="inverted" label="Inverted Spinner" />
```

### Specification

See [SPEC.md](./SPEC.md).

### Migration Guide

If you're upgrading to Fluent UI v9 see [MIGRATION.md](./MIGRATION.md) for guidance on updating to the latest Spinner implementation.

## Opt-in CSS Modules styles

CSS Modules alternatives are available for `Spinner`. The default exports and component imports continue to use Griffel.

To opt in, configure your bundler to replace each `use<Component>Styles.styles.js` module with its adjacent `use<Component>Styles.styles.css.js` alternative (or `.styles.ts` with `.styles.css.ts` for source builds). Apply the replacement consistently to client and server bundles. The CSS loader must provide a default class-name map and retain the adjacent `.module.css` asset, including CSS from dependencies. All component rules are in `@layer fluentui` and use the theme custom properties supplied by `FluentProvider`.

The CSS hook retains the shared Fluent context for the spinner tail's RTL styling.

For composed labels, also select the CSS Modules alternative for `@fluentui/react-label`. Mixing its default unlayered Griffel styles with these layered alternatives can override label typography.
