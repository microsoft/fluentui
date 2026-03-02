# Spinner Migration

## Key Changes

- `size` prop changes from `SpinnerSize` enum to a string literal
- `labelPosition` values renamed (`"right"` → `"after"`, `"left"` → `"before"`, `"top"` → `"above"`, `"bottom"` → `"below"`)
- No structural API change — Spinner remains a single self-contained component

## Before / After Example

```tsx
// v8
import { Spinner, SpinnerSize } from '@fluentui/react';

<Spinner size={SpinnerSize.large} label="Loading..." labelPosition="right" />;
```

```tsx
// v9
import { Spinner } from '@fluentui/react-components';

<Spinner size="large" label="Loading..." labelPosition="after" />;
```

## SpinnerSize Enum → size String

| v8 `SpinnerSize`     | v9 `size`       |
| -------------------- | --------------- |
| `SpinnerSize.xSmall` | `"extra-small"` |
| `SpinnerSize.small`  | `"small"`       |
| `SpinnerSize.medium` | `"medium"`      |
| `SpinnerSize.large`  | `"large"`       |

v9 also adds `"tiny"`, `"extra-large"`, and `"huge"` sizes with no v8 equivalent.

## labelPosition Values

| v8         | v9         |
| ---------- | ---------- |
| `"right"`  | `"after"`  |
| `"left"`   | `"before"` |
| `"top"`    | `"above"`  |
| `"bottom"` | `"below"`  |

Default in both v8 and v9: label appears below the spinner.

## Appearance Variants (new in v9)

```tsx
// v9 — inverted appearance for dark backgrounds
<Spinner appearance="inverted" label="Loading..." />
// v9 — primary appearance
<Spinner appearance="primary" label="Loading..." />
```

## ISpinnerProps → SpinnerProps

| v8              | v9                         | Notes                                  |
| --------------- | -------------------------- | -------------------------------------- |
| `size`          | `size`                     | Enum → string literal; see table above |
| `label`         | `label`                    | Slot — accepts string or JSX           |
| `labelPosition` | `labelPosition`            | Renamed values; see table above        |
| `ariaLabel`     | `aria-label`               | Native HTML prop                       |
| `ariaLive`      | `aria-live`                | Native HTML prop                       |
| `className`     | `className`                |                                        |
| `styles`        | `className` + `makeStyles` |                                        |
| `theme`         | `FluentProvider`           |                                        |
| `componentRef`  | `ref`                      |                                        |
| —               | `appearance`               | New: `"primary"` \| `"inverted"`       |
