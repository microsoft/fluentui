# RFC: Headless Components

## Contributors

- @dmytrokirpa

## Summary

Fluent v9's headless layer is a behavior-first, styling-agnostic foundation: it provides reliable interaction, accessibility, and composition patterns so product teams can bring their own visual system — CSS Modules, design tokens, Tailwind, whatever fits — while staying on a shared Fluent contract. It's intentionally moving toward modern browser primitives to cut JS from the boot path and keep the layer evergreen.

We already ship base hooks (`useButton`, `renderButton`) and context value hooks. This RFC proposes the next step up that stack: fully featured unstyled primitives so consumers don't have to hand-wire `useButton + renderButton` for every component, and so component state is surfaced as stable `data-*` attributes for CSS targeting without requiring direct hook access.

Introduce `@fluentui/react-headless-components`: components built from the existing hook + render layer, with state reflected as `data-*` attributes on DOM slots.

Goal: give teams a supported, low-boilerplate path to Fluent behavior and accessibility with complete freedom over visual design.

## Problem Statement

Headless hooks solve logic reuse but leave two gaps.

**Gap 1 — wiring boilerplate.** Every consumer who wants custom styling today must wire `useButton + renderButton` by hand, for every component they use:

```tsx
const MyButton = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);
  return renderButton(state);
});
```

This works, but across 30+ convergence components it's a lot of repetitive plumbing that every team has to own and maintain in their own codebase.

**Gap 2 — state visibility at the component level.** When consumers use `<Button />` they don't get direct access to internal state the way hooks do, so they can't reliably style based on whether the button is disabled, icon-only, etc. — short of reaching into undocumented class names or reimplementing hooks themselves.

This RFC closes both:

- **Gap 1:** pre-wired headless components for all convergence components, removing the hook + render boilerplate from app code
- **Gap 2:** stable `data-*` attributes emitted by state hooks, so full-component DX is preserved while state-driven styling remains straightforward

## Decision Drivers

- reduce repeated hook + render wiring for common component usage
- provide a stable, documented state-to-attribute contract for CSS targeting
- preserve accessibility behavior parity with styled components

## Prior Art

Several widely-used headless component libraries expose component state via `data-*` attributes, establishing this as a recognized ecosystem pattern.

**[Radix UI](https://www.radix-ui.com/)** uses a single `data-state` attribute per component with semantic string values (`data-state="open"` / `"closed"` on Dialog, `data-state="checked"` / `"unchecked"` on Checkbox). Additional attributes like `data-disabled` and `data-highlighted` cover contextual state.

**[React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html)** (Adobe) emits granular per-property `data-*` attributes (`data-hovered`, `data-pressed`, `data-focused`, `data-focus-visible`, `data-disabled`, `data-selected`, `data-orientation`, etc.). It also supports render props as an alternative — consumers can pass a function to `className` or `style` that receives the full component state object.

**[Base UI](https://base-ui.com/)** (MUI) uses a similar `data-*` attribute model and additionally supports a `className` callback that receives component state, giving consumers both a CSS-native and a JS-driven option.

The `data-*` attribute approach is the common denominator across all three: it works with plain CSS, CSS Modules, Tailwind, and CSS-in-JS without requiring a JavaScript styling layer. The render-prop and `className`-callback alternatives that Base UI and React Aria Components also offer are what we evaluated and rejected in [Alternatives Considered](#alternatives-considered).

Fluent's proposal aligns with the `data-*` pattern while adding an explicit versioned contract: attributes are typed on the component `State` type and removal or rename is treated as a breaking change.

## Proposal

### Package

Ship headless components from `@fluentui/react-headless-components`.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from '@fluentui/react-headless-components/Accordion';
import { Button } from '@fluentui/react-headless-components/Button';
```

All convergence components are in scope. Simple components (Button, Checkbox, RadioButton,
Toggle, Badge) ship first; compound/composite components (Menu, Dialog, Combobox, Select)
follow in subsequent phases.

Headless hooks remain exported from `@fluentui/react-headless-components/[Component]`.

### Composition Model

Each headless component is hook + render only (and option context if it's a composite component).

```tsx
import { useButton, renderButton } from '@fluentui/react-headless-components/Button';

export const Button = React.forwardRef((props, ref) => {
  const state = useButton(props, ref);
  return renderButton(state);
});
```

This abstraction preserves the existing base architecture but removes repetitive wiring from app
code.

> **💁‍♂️ Note:** headless components wrap existing hooks — they introduce no new behavior or
> reimplemented logic.

Compound components wire sub-components and their shared context the same way styled variants
do; the difference is that Griffel styles are omitted. Sub-components are exported from the
package root alongside the parent (e.g. `Menu`, `MenuTrigger`, `MenuPopover`, `MenuList`,
`MenuItem`).

### State To `data-*` Mapping (Primary Contract)

Headless state hooks map internal state to stable `data-*` attributes. Components then render
those attributes on slots so styling remains possible without direct hook state access.

Example (simplified):

```tsx
const state = useButton(props, ref);

// stringifyDataAttribute: returns undefined (omits the attribute) for falsy presence
// attributes, or the string value ("true"/"false"/enum) for boolean/tri-state attributes.
Object.assign(state.root, {
  'data-disabled': stringifyDataAttribute(state.disabled),
  'data-disabled-focusable': stringifyDataAttribute(state.disabledFocusable),
  'data-icon-only': stringifyDataAttribute(state.iconOnly),
});

return state;
```

Consumer styling:

```css
.myButton[data-disabled] {
  opacity: 0.5;
}

.myButton[data-icon-only] {
  padding-inline: 0.5rem;
}
```

or with TailwindCSS:

```tsx
<Button className="data-[disabled]:opacity-50 data-[icon-only]:px-2" />
```

These attributes are authored in state hooks in `@fluentui/react-headless-components` and are
treated as the stable styling surface for headless primitives.

Core attributes:

| Attribute                 | Values                             |
| ------------------------- | ---------------------------------- |
| `data-disabled`           | presence                           |
| `data-disabled-focusable` | presence                           |
| `data-focusable`          | presence                           |
| `data-checked`            | `"true"` \| `"false"` \| `"mixed"` |
| `data-selected`           | presence                           |
| `data-expanded`           | `"true"` \| `"false"`              |
| `data-open`               | `"true"` \| `"false"`              |
| `data-orientation`        | `"horizontal"` \| `"vertical"`     |
| `data-icon-position`      | `"before"` \| `"after"`            |
| `data-icon-only`          | presence                           |
| `data-label-position`     | `"before"` \| `"after"`            |

Attribute emission rules:

- presence attributes are emitted only when the state is true; otherwise omitted
- boolean-valued attributes are always emitted as `"true"` or `"false"`
- tri-state attributes (for example `data-checked`) use the declared enum values
- attributes are emitted on the root slot unless a documented component exception exists

Rules:

- these attributes represent base state only
- no design-state attributes (no appearance/size/shape)
- removal/rename is breaking (major)
- adding a new attribute is non-breaking for CSS selectors; it may affect snapshot tests, which is acceptable
- data attributes must be typed on the component `State` type (e.g. as `'data-disabled'?: string`) so they surface in `.d.ts` declarations, enabling automatic Storybook props-table population and agent metadata extraction
- data attributes must be documented on the components documentation page (Storybook docsite)
- base state attributes are reserved; if consumers provide the same `data-*` attribute, the base-hook value wins —
  this prevents state misrepresentation (a disabled button must not appear enabled regardless of consumer props)
- precedence must be deterministic: apply reserved base-state attributes after consumer root props are resolved
- `data-*` attributes are emitted as plain DOM attributes and are SSR-safe; no hydration concerns

## Accessibility

Headless components must match styled-component accessibility behavior.

Validation bar:

- ARIA semantics via base hooks (unit-tested)
- keyboard navigation for interactive/compound components
- focus management for overlays and composites
- automated a11y checks in component tests

## Testing Strategy

Tests live with `react-headless-components` and cover:

- data attribute correctness across state combinations
- slot API parity with styled variants
- compound-component context/ref behavior
- accessibility and keyboard interaction

## Alternatives Considered

### State classes

```tsx
<Button disabled disabledFocusable>
  Button
</Button>

// Renders:
//  <button class="fui-Button--disabled fui-Button--disabledFocusable">Button</button>
```

Rejected. Class names create a naming contract between behavior state and styling implementation — teams end up styling against `fui-Button--disabled` instead of a documented attribute, which is brittle across renames and refactors. It also blurs the boundary between what Fluent owns and what the consumer owns. `data-*` attributes keep that boundary explicit and selector-based.

### Render props / callback className API

```tsx
<Button className={state => `fui-Button ${state.disabled ? 'fui-Button--disabled' : ''}`}>Save</Button>
```

Rejected. The render-prop pattern is idiomatic in some libraries but introduces a different composition model from the existing Fluent slot API. It increases verbosity at the call site and makes migrating between headless and styled variants harder — a consumer can't just swap the import path; they'd have to rewrite the JSX too.

### Style callback prop

```tsx
<Button styles={state => ({ root: { opacity: state.disabled ? 0.5 : 1 } })} />
```

Rejected. This effectively recreates a runtime styling API — which is what Griffel already is. It ties state access to a proprietary prop shape, adds API surface we'd have to version, and works against the goal of exposing state through standard, framework-agnostic DOM selectors that any styling tool can target.

## Decision

Proceed with `@fluentui/react-headless-components` and `data-*` attributes as the stable state-styling contract.

This approach keeps the implementation grounded in primitives the platform already supports — DOM attribute selectors are universal, zero-JS, and work with every styling tool from plain CSS to Tailwind to CSS-in-JS. It preserves the existing hook + render architecture (no new behavior, no reimplemented logic), and gives teams a single supported import path to Fluent behavior and accessibility without locking them into the Fluent visual system.
