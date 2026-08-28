# @fluentui/react-windmod-preview

**Fluent UI React components styled with Tailwind v4 + CSS Modules ("windmod")**

Each component composes the corresponding
[`@fluentui/react-headless-components-preview`](../../react-headless-components-preview/library)
hooks (`useX` → `useXStyles` → `renderX`) with build-time-compiled CSS Modules that replicate the
Griffel suite's visuals. Theming is pure CSS via
[`@fluentui/react-tailwind-theme-preview`](../../react-tailwind-theme-preview) theme classes,
applied by `FluentProvider`, which renders a block element carrying the suite's base typography,
text colour and background onto its subtree. No Griffel, no runtime style injection.

> **Preview** — this package tracks `react-headless-components-preview`, which is itself in
> preview: APIs may change without notice, and coverage is limited to the components the headless
> package ships. Not production-ready.

Using a coding agent? This package ships an [Agent Skill](./skills/fluentui-windmod/SKILL.md) covering
the override model, the class and `data-*` surface, the variant catalog and the theme classes. It
travels in the tarball, so it stays in step with the version you installed — point your agent at
`node_modules/@fluentui/react-windmod-preview/skills/fluentui-windmod/SKILL.md`
([how](./skills/fluentui-windmod/README.md)).

Coming from `@fluentui/react-components`? [MIGRATION.md](./MIGRATION.md) is the port guide: the subpath
map, the parity contract, every deliberate difference, and what is not shipped.

## Usage

```sh
npm install @fluentui/react-windmod-preview @fluentui/react-tailwind-theme-preview
```

```js
// Once per document, before your own styles:
import '@fluentui/react-tailwind-theme-preview/styles.css';
```

```jsx
import { Button, Tooltip, FluentProvider, webDarkThemeClassName } from '@fluentui/react-windmod-preview';

export default function App() {
  return (
    <FluentProvider theme={webDarkThemeClassName}>
      <Tooltip content="Hello" relationship="label">
        <Button appearance="primary">Hover me</Button>
      </Tooltip>
    </FluentProvider>
  );
}
```

Component styles are delivered **per component**: each component's class map side-effect-imports
its own compiled stylesheet, so a bundler ships only what the app uses. Alongside them, load this
package's root sheet — `@fluentui/react-windmod-preview/base.css` (~3 KB: the cascade-layer order
and the global `@property` registrations) — once per document, ahead of everything else, either
directly or by `@import`ing it at the top of your own root stylesheet.

CommonJS/SSR consumers instead import `@fluentui/react-windmod-preview/styles.css`, the
batteries-included aggregate carrying the root sheet and every component in one file.

See [MIGRATION.md](./MIGRATION.md#installation-and-imports) for both setups.

## Styling contract

- Slot `className` props merge last — your classes win via cascade layers (consumer CSS is
  unlayered; all package styles live in `fui.*` layers).
- Each component's root carries a pair of public identity classes: `fui-button` (the documented
  identity class — safe for consumer CSS and `querySelector`, no escaping needed) and
  `group/fui-button` (Tailwind's real named-group class). Internals use hashed idents and
  `data-*` state attributes (`data-open`, `data-placement`, `data-size`, …).
- Children inside a component can target it directly with `group-<variant>/fui-<component>`
  (e.g. `group-disabled/fui-button:text-red-500`) — no group name declaration required.
  Consumers may additionally add their own `group/name` via `className` to disambiguate nested
  instances of the same component, but are never required to.

## Overflow

**There is no windmod `Overflow`, and none is coming — nothing about it needs porting.** Keep
importing `Overflow` / `OverflowItem` / `useOverflowMenu` from `@fluentui/react-components` and
compose them with windmod components directly.

`Overflow` is renderless. It emits no element of its own: it clones its single child, drives
[`@fluentui/priority-overflow`](../../priority-overflow) over that child's subtree, and stamps
`data-overflowing`, `data-overflow-item`, `data-overflow-menu`, `data-overflow-divider` and
`data-overflow-group` on the elements the engine measures. A windmod port re-skins a headless
component; a component with no skin has nothing to re-skin.

The entire Griffel `Overflow` family ships **two** CSS declarations, both token-free and
theme-free (for scale, windmod `Button` reproduces 105):

```css
[data-overflowing] {
  display: none;
}
[data-overflow-menu] {
  flex-shrink: 0;
}
```

Neither says anything about how the items look, which is exactly why they are as correct over
windmod-styled items as over Griffel-styled ones.

```jsx
import { Overflow, OverflowItem, useOverflowMenu } from '@fluentui/react-components';
import { Button } from '@fluentui/react-windmod-preview';

// `Menu` is not part of this package; a count of what the engine hid needs no extra component.
const OverflowCount = () => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu();
  return isOverflowing ? (
    <Button ref={ref} appearance="primary" aria-label={`${overflowCount} more items`}>
      +{overflowCount}
    </Button>
  ) : null;
};

export const Commands = ({ labels }) => (
  <Overflow padding={40}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
      {labels.map(label => (
        <OverflowItem key={label} id={label}>
          <Button>{label}</Button>
        </OverflowItem>
      ))}
      <OverflowCount />
    </div>
  </Overflow>
);
```

### Compatibility statement (measured, not assumed)

The live story `Windmod/Overflow → WithWindmodComponents`
(`stories/src/Overflow/OverflowWithWindmod.stories.tsx`) was driven in headless Chrome over eight
container widths — 1000, 760, 600, 480, 360, 260, 180 and back to 1000 px — with eight windmod
`Button`s as the overflow items and a windmod `Button` as the `+N` trigger. All 18 assertions
passed:

- At every width the number of items the engine marked `data-overflowing` equalled the number of
  items the browser actually gave `display: none` (0, 2, 4, 5, 6, 7, 8, 0) — the items genuinely
  disappear, they are not merely marked.
- Every hidden element carried the `fui-button` identity class, so what disappeared really was a
  windmod component.
- The `+N` trigger appeared exactly when items were hidden, reported the correct count, and
  computed `flex-shrink: 0`.
- `scrollWidth` equalled `clientWidth` at every width — the strip never spilled its box.
- Widening back to 1000 px restored all eight items and removed the trigger: the engine is
  reversible over windmod components.

Why the hiding wins the cascade, also measured: on a hidden item, exactly two rules in the
document declare `display` — windmod's `.fuicm-button-root-… { display: inline-flex }` inside the
`fui.components.l1` layer, and Griffel's `[data-overflowing] { display: none }`, which is
**unlayered**. Unlayered CSS outranks layered CSS regardless of selector weight, so the win does
not depend on specificity (Griffel's selector happens to be heavier as well).

### If you want the Griffel-free `Overflow`

`@fluentui/react-headless-components-preview/overflow` re-exports Griffel's `OverflowItem`,
`OverflowDivider` and every hook unchanged, and swaps in an `Overflow` that is Griffel's minus the
styles hook — that missing hook is the entire delta. It is smaller and pulls in no Griffel, but it
ships no CSS, so the engine stamps the attributes and nothing acts on them. **Supply the two
declarations yourself, from an unlayered stylesheet:**

```css
/* Consumer CSS is unlayered, which is what lets these out-rank the component's own layered
   `display` — do not wrap them in a `@layer`. */
.my-overflow-container [data-overflowing] {
  display: none;
}
.my-overflow-container [data-overflow-menu] {
  flex-shrink: 0;
}
```

The same probe run above measured this path side by side with the Griffel one and produced
identical visibility numbers at all eight widths.
