# Theme Migration

## Provider

```tsx
// v8
import { ThemeProvider } from '@fluentui/react';
<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>;

// v9
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
<FluentProvider theme={webLightTheme}>
  <App />
</FluentProvider>;
```

v8 applies theme values as a JS object on React context. v9 applies theme values as **CSS variables** in the DOM.

## Default Themes

| v8            | v9                       |
| ------------- | ------------------------ |
| Default light | `webLightTheme`          |
| Default dark  | `webDarkTheme`           |
| High contrast | `teamsHighContrastTheme` |
| Teams light   | `teamsLightTheme`        |
| Teams dark    | `teamsDarkTheme`         |

All built-in themes are exported from `@fluentui/react-components`.

## Side-by-Side (v8 + v9)

When running both versions simultaneously, add a `FluentProvider` at every point where you use v9 components:

```tsx
import { ThemeProvider } from '@fluentui/react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

<ThemeProvider theme={v8Theme}>
  <FluentProvider theme={webLightTheme}>{/* v9 components here */}</FluentProvider>
</ThemeProvider>;
```

## Token Naming

v8 tokens are component-scoped:

```ts
theme.semanticColors.buttonBackground;
theme.semanticColors.buttonBackgroundHovered;
```

v9 tokens are purpose-scoped (neutral/brand + usage + state):

```ts
tokens.colorNeutralBackground1;
tokens.colorNeutralBackground1Hover;
tokens.colorBrandBackground;
```

Use v9 tokens in `makeStyles`:

```ts
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover },
  },
});
```

## Styling: mergeStyles → makeStyles

```tsx
// v8
import { mergeStyles, mergeStyleSets } from '@fluentui/react';

const containerClass = mergeStyles({ display: 'flex', gap: '8px' });
const styles = mergeStyleSets({
  root: { padding: '16px' },
  title: { fontWeight: 'bold' },
});

// v9
import { makeStyles, mergeClasses } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: { display: 'flex', gap: '8px' },
  root: { padding: '16px' },
  title: { fontWeight: 'bold' },
});

function MyComponent({ extra }: { extra?: string }) {
  const s = useStyles();
  return <div className={mergeClasses(s.root, extra)}>{...}</div>;
}
```

Key differences:

- `makeStyles` returns a **hook** — call it inside the component
- `mergeClasses` replaces `mergeStyles` for combining class names
- Styles are **static** (no function-in-styles) — use component state passed to the hook via parameters if needed

## Dynamic Styles

`makeStyles` is **static** — the style object cannot contain runtime expressions or variables. Use multiple named rules combined with `mergeClasses` instead:

```tsx
// WRONG — makeStyles does not accept runtime expressions
const useStyles = makeStyles({
  root: { color: isError ? 'red' : 'black' }, // ❌ will not work
});

// CORRECT — define separate rules, merge conditionally
const useStyles = makeStyles({
  root: { color: tokens.colorNeutralForeground1 },
  error: { color: tokens.colorPaletteRedForeground1 },
  small: { fontSize: '12px' },
});

function MyComponent({ isError, isSmall }: { isError: boolean; isSmall: boolean }) {
  const s = useStyles();
  return <span className={mergeClasses(s.root, isError && s.error, isSmall && s.small)}>text</span>;
}
```

For styles that depend on **numeric or string values** (e.g., dynamic width), use inline `style` for the dynamic part and `makeStyles` for the static shell:

```tsx
// OK — inline style for truly dynamic values
const useStyles = makeStyles({ root: { display: 'flex' } });
const s = useStyles();
<div className={s.root} style={{ width: `${dynamicWidth}px` }} />;
```

## Nested FluentProvider (Token Overrides)

Multiple `FluentProvider` instances can be nested. The inner provider overrides only the tokens it specifies — useful for dark sections, compact density, or brand color changes within a subtree:

```tsx
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';

// Dark sidebar inside a light-theme app
<FluentProvider theme={webLightTheme}>
  <main>{/* light theme */}</main>
  <FluentProvider theme={webDarkTheme}>
    <aside>{/* dark theme — only this subtree */}</aside>
  </FluentProvider>
</FluentProvider>;
```

To override individual tokens without switching the whole theme, pass a partial token object:

```tsx
// Override just the brand color in one subtree
<FluentProvider theme={{ colorBrandBackground: '#e00000' }}>
  <Button appearance="primary">Red brand button</Button>
</FluentProvider>
```

## Component `styles` Prop → className

```tsx
// v8 — styles prop
<Button styles={{ root: { color: 'red' }, label: { fontWeight: 'bold' } }} />;

// v9 — className only; no per-slot styles prop
const useStyles = makeStyles({
  btn: { color: 'red', fontWeight: 'bold' },
});
const s = useStyles();
<Button className={s.btn} />;
```

## Custom Theme Migration

### IPalette → BrandVariants

v8 uses `IPalette` (12 neutral + 9 theme colors). v9 uses `BrandVariants` (16-step ramp).

```ts
// v9 BrandVariants shape — 16 steps from darkest (10) to lightest (160)
const myBrand: BrandVariants = {
  10: '#020305',
  20: '#111723',
  30: '#16263D',
  40: '#193253',
  50: '#1B3F6A',
  60: '#1B4D83',
  70: '#1B5C9E',
  80: '#1A6CB9',
  90: '#1471BE',
  100: '#2079C7',
  110: '#3086CF',
  120: '#4F9AD6',
  130: '#6DAEDE',
  140: '#91C5E8',
  150: '#B9D9F2',
  160: '#E0EEF9',
};

import { createLightTheme, createDarkTheme } from '@fluentui/react-components';

const myLightTheme = createLightTheme(myBrand);
const myDarkTheme = createDarkTheme(myBrand);

// Usage — dark theme with CSS variable injection:
<FluentProvider theme={myDarkTheme}>
  <App />
</FluentProvider>;
```

### Theme Shim Utilities

These helpers are published in `@fluentui/react-migration-v8-v9`:

```ts
import { createV8Theme, createV9Theme, createBrandVariants } from '@fluentui/react-migration-v8-v9';
```

| Function              | Input                    | Output        | Use case                             |
| --------------------- | ------------------------ | ------------- | ------------------------------------ |
| `createV8Theme`       | v9 theme + BrandVariants | v8 theme      | Make v8 components look like v9      |
| `createV9Theme`       | v8 theme                 | v9 theme      | Keep v9 components looking like v8   |
| `createBrandVariants` | v8 IPalette              | BrandVariants | Derive v9 brand ramp from v8 palette |
