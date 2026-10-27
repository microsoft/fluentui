# @fluentui/react-infolabel

**React Infolabel components for [Fluent UI React](https://react.fluentui.dev/)**

To use InfoLabel import InfoLabel like this:

```jsx
import { InfoLabel } from '@fluentui/react-components';

const InfoLabelExample = () => {
  return <InfoLabel info="Sample information">Sample label</InfoLabel>;
};
```

## Opt-in CSS Modules styles

The `use*Styles.styles.css` modules beside the existing Griffel hooks provide opt-in,
layered CSS alternatives with the same exports. Configure the bundler to replace
`.styles` with `.styles.css.ts` for source imports and `.styles.js` with
`.styles.css.js` for built imports. Load CSS Modules as default class-name maps and
retain the package CSS assets. Default component imports still use Griffel.
Composed components require their own style alternatives; this does not remove
all reachable Griffel dependencies. Browser, forced-colors, RTL, and visual-regression
parity must be validated before switching defaults.

Select the `Label` and `InfoButton` alternatives together with `InfoLabel`. `InfoButton` styles its portaled info surface independently, but the composed `Popover` still needs its own alternative. Use headless icons with their CSS defaults in the `fluentui` layer.
