# @fluentui/react-persona

**React Persona components for [Fluent UI React](https://react.fluentui.dev/)**

## Usage

To import Persona:

```js
import { Persona } from '@fluentui/react-components';
```

### Examples

```jsx
const PersonaExample = () => {
  return <Persona name="Kevin Sturgis" secondaryText="Software Engineer" />;
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

Select the composed `Avatar` and `PresenceBadge` alternatives as well when configuring CSS selection for the complete Persona subtree.
