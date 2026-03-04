# Rating Migration

v9 `Rating` has a cleaner API. The main differences are the `value` prop rename, a new `RatingDisplay` component for read-only display, and half-star support via `step`.

## Key Differences

- `rating` prop renamed to `value`
- Read-only display → use `RatingDisplay` instead of `readOnly` prop
- `icon` (string icon name) → `iconFilled` / `iconOutline` (React element types from `@fluentui/react-icons`)
- `onChange` signature changed
- New `step={0.5}` for half-star ratings
- New `color` prop: `"neutral"` (default) \| `"brand"` \| `"marigold"`
- `ariaLabelFormat` → `itemLabel` (function)

## Prop Mapping

| v8 `IRatingProps`        | v9 `RatingProps`             | Notes                                                       |
| ------------------------ | ---------------------------- | ----------------------------------------------------------- |
| `rating`                 | `value`                      | Renamed                                                     |
| `max`                    | `max`                        | Default 5                                                   |
| `min` / `allowZeroStars` | —                            | Use `value={0}` as initial value                            |
| `readOnly`               | Use `<RatingDisplay>`        | Separate component for display-only                         |
| `icon`                   | `iconFilled` / `iconOutline` | Pass a React component type (not an icon name string)       |
| `size`                   | `size`                       | Values changed: see size table below                        |
| `onChange`               | `onChange`                   | Type: `EventHandler<RatingOnChangeEventData>`; `data.value` |
| `ariaLabelFormat`        | `itemLabel`                  | Now a function: `(rating) => string`                        |
| `styles`                 | `className`                  | Use `makeStyles`                                            |
| `theme`                  | —                            | Use `FluentProvider`                                        |

## Size Mapping

| v8 `RatingSize`    | v9 `size`                    |
| ------------------ | ---------------------------- |
| `RatingSize.Small` | `"small"`                    |
| `RatingSize.Large` | `"large"`                    |
| (default)          | `"extra-large"` (v9 default) |

## Before / After

```tsx
// v8
import { Rating, RatingSize } from '@fluentui/react';
<Rating
  rating={value}
  max={5}
  size={RatingSize.Large}
  onChange={(_, v) => setValue(v ?? 0)}
  ariaLabelFormat="{0} of {1} stars"
/>;

// v9
import { Rating } from '@fluentui/react-components';
<Rating
  value={value}
  max={5}
  size="large"
  onChange={(_, data) => setValue(data.value)}
  itemLabel={v => `${v} of 5 stars`}
/>;
```

## Read-Only Display

```tsx
// v8
<Rating rating={3.5} readOnly />;

// v9 — use RatingDisplay for read-only
import { RatingDisplay } from '@fluentui/react-components';
<RatingDisplay value={3.5} />;
// RatingDisplay also shows a count:
<RatingDisplay value={4.2} count={128} />;
```

## Half Stars

```tsx
// v9 — half-star precision
<Rating value={3.5} step={0.5} />
```

## Custom Icon

```tsx
// v9
import { HeartFilled, HeartRegular } from '@fluentui/react-icons';
<Rating iconFilled={HeartFilled} iconOutline={HeartRegular} />;
```
