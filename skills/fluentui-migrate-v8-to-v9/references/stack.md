# Stack Migration

## Overview

v9 has no `Stack` component. Replace it with a plain `div` styled using `makeStyles` and CSS flexbox.

As an interim bridge, `StackShim` is available:

```tsx
import { StackShim } from '@fluentui/react-migration-v8-v9';
```

## Default Stack (column layout)

```tsx
// v8
<Stack>{children}</Stack>;

// v9
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: 'auto',
    height: 'auto',
    boxSizing: 'border-box',
  },
});
const s = useStyles();
<div className={s.root}>{children}</div>;
```

## Prop → CSS Reference

### `horizontal`

```ts
// Stack horizontal
flexDirection: 'row';
// default (vertical)
flexDirection: 'column';
```

### `reversed`

```ts
// horizontal + reversed
flexDirection: 'row-reverse';
// vertical + reversed
flexDirection: 'column-reverse';
```

### `tokens.childrenGap` (spacing between items)

```ts
// Preferred: CSS gap (v9 dropped IE11 support)
gap: '10px'

// Alternative: margin on children (use when gap is insufficient)
'> :not(:last-child)': { marginBottom: '10px' } // vertical
'> :not(:last-child)': { marginRight: '10px' }  // horizontal
```

### `tokens.padding`

```ts
padding: '10px';
```

### `tokens.maxWidth` / `tokens.maxHeight`

```ts
maxWidth: '400px';
maxHeight: '200px';
```

### `grow`

```ts
'> *': { flexGrow: 1 }
```

### `disableShrink`

```ts
'> *': { flexShrink: 0 }
```

### `wrap`

```ts
// Adds a wrapping inner div
// outer
flexWrap: 'wrap',
overflow: 'visible',
height: '100%',

// inner wrapper div
display: 'flex',
flexWrap: 'wrap',
overflow: 'visible',
boxSizing: 'border-box',
width: '100%',
maxWidth: '100vw',
```

### `verticalFill`

```ts
height: '100%';
```

### `horizontalAlign` / `verticalAlign`

Alignment depends on `flex-direction`:

| Direction          | Horizontal →      | Vertical ↓        |
| ------------------ | ----------------- | ----------------- |
| `column` (default) | `align-items`     | `justify-content` |
| `row` (horizontal) | `justify-content` | `align-items`     |

Value mapping: `start` → `flex-start`, `end` → `flex-end`, `center` → `center`, `space-between` → `space-between`

## StackItem → makeStyles

```tsx
// v8
<Stack.Item grow align="center">
  {child}
</Stack.Item>;

// v9
const useStyles = makeStyles({
  item: {
    flexGrow: 1,
    alignSelf: 'center',
  },
});
const s = useStyles();
<div className={s.item}>{child}</div>;
```

### StackItem prop → CSS

| v8 `IStackItemProps` | CSS                               |
| -------------------- | --------------------------------- |
| `grow`               | `flex-grow: 1` (or numeric value) |
| `shrink`             | `flex-shrink: 1`                  |
| `disableShrink`      | `flex-shrink: 0`                  |
| `align`              | `align-self`                      |
| `verticalFill`       | `height: 100%`                    |
| `order`              | `order`                           |
