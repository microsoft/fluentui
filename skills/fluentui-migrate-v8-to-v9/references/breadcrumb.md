# Breadcrumb Migration

v9 `Breadcrumb` uses composable JSX children (`BreadcrumbItem`, `BreadcrumbButton`, `BreadcrumbLink`, `BreadcrumbDivider`) instead of an `items` array.

## Architecture Shift

| v8                                     | v9                                                                   |
| -------------------------------------- | -------------------------------------------------------------------- |
| `items` array prop                     | Declarative JSX children                                             |
| `IBreadcrumbItem.text`                 | `<BreadcrumbButton>` children                                        |
| `IBreadcrumbItem.href`                 | `<BreadcrumbLink href="...">`                                        |
| `IBreadcrumbItem.onClick`              | `onClick` on `<BreadcrumbButton>`                                    |
| `IBreadcrumbItem.isCurrentItem`        | `current` on `<BreadcrumbButton>`                                    |
| `maxDisplayedItems` + `overflowIndex`  | Use `<Overflow>` + `<OverflowItem>` — see [overflow.md](overflow.md) |
| `onRenderItem` / `onRenderItemContent` | Render `<BreadcrumbItem>` directly                                   |
| `dividerAs`                            | `<BreadcrumbDivider>` (place manually between items)                 |

## Component Tree

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbLink,
  BreadcrumbDivider,
} from '@fluentui/react-components';
```

| v9 Component        | Purpose                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `Breadcrumb`        | Container (`<nav>` element)                                                     |
| `BreadcrumbItem`    | `<li>` wrapper — use around every item                                          |
| `BreadcrumbLink`    | An `<a>` tag — use for navigable crumbs                                         |
| `BreadcrumbDivider` | Separator between items (must be placed manually between each `BreadcrumbItem`) |
| `BreadcrumbButton`  | A `<button>` — use for the current/last crumb or click handlers                 |

## Prop Mapping

| v8 `IBreadcrumbProps` | v9 equivalent                      | Notes                                   |
| --------------------- | ---------------------------------- | --------------------------------------- |
| `items`               | JSX children                       |                                         |
| `maxDisplayedItems`   | `<Overflow>` wrapper               | See overflow.md                         |
| `overflowIndex`       | `<OverflowItem>` with `priority`   | See overflow.md                         |
| `onReduceData`        | `useOverflowMenu` hook             | See overflow.md                         |
| `dividerAs`           | `<BreadcrumbDivider>`              | Place between `BreadcrumbItem` wrappers |
| `onRenderItem`        | Render `<BreadcrumbItem>` directly |                                         |
| `focusMode`           | `focusMode` on `<Breadcrumb>`      | `"tab"` (default) \| `"arrow"`          |
| `size`                | `size` on `<Breadcrumb>`           | `"small"` \| `"medium"` \| `"large"`    |
| `styles`              | `className` + `makeStyles`         |                                         |
| `theme`               | —                                  | Use `FluentProvider`                    |

## Before / After

### Before

```tsx
import { Breadcrumb } from '@fluentui/react';
<Breadcrumb
  items={[
    { text: 'Home', key: 'home', href: '/' },
    { text: 'Docs', key: 'docs', href: '/docs' },
    { text: 'Components', key: 'components', isCurrentItem: true },
  ]}
/>;
```

### After

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbLink,
  BreadcrumbDivider,
} from '@fluentui/react-components';

<Breadcrumb aria-label="Breadcrumb">
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbDivider />
  <BreadcrumbItem>
    <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbDivider />
  <BreadcrumbItem>
    <BreadcrumbButton current>Components</BreadcrumbButton>
  </BreadcrumbItem>
</Breadcrumb>;
```

## Overflow (maxDisplayedItems equivalent)

Combine with `<Overflow>` and `useOverflowMenu` to collapse items when the container is too narrow — see [overflow.md](overflow.md) for the full pattern.
