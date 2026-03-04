# Link Migration

v9 `Link` is a near drop-in replacement with improved accessibility and an `inline` prop for use alongside body text.

## Key Differences

- Renders as `<a>` when `href` is provided, as `<button>` otherwise (same as v8)
- New `appearance="subtle"` removes the brand color for a neutral look
- New `inline` prop adds an underline and adjusts spacing for use inside prose text
- `disabledFocusable` keeps the link in the tab order while disabled (accessibility improvement)
- No `styles` prop — use `className` + `makeStyles`

## Prop Mapping

| v8 `ILinkProps` | v9 `LinkProps`      | Notes                                             |
| --------------- | ------------------- | ------------------------------------------------- |
| `href`          | `href`              |                                                   |
| `target`        | `target`            |                                                   |
| `rel`           | `rel`               |                                                   |
| `onClick`       | `onClick`           |                                                   |
| `disabled`      | `disabled`          |                                                   |
| `componentRef`  | `ref`               |                                                   |
| `styles`        | `className`         | Use `makeStyles`                                  |
| `theme`         | —                   | Use `FluentProvider`                              |
| —               | `appearance`        | New: `"default"` \| `"subtle"`                    |
| —               | `inline`            | New: underlined, inline-text variant              |
| —               | `disabledFocusable` | New: focusable while disabled (for accessibility) |
| —               | `as`                | New: `"a"` \| `"button"` \| `"span"`              |

## Before / After

```tsx
// v8
import { Link } from '@fluentui/react';
<Link href="/docs">Read the docs</Link>;
<Link onClick={handleClick}>Click me</Link>;

// v9
import { Link } from '@fluentui/react-components';
<Link href="/docs">Read the docs</Link>;
<Link onClick={handleClick}>Click me</Link>;
```

## Inline Text Link

When a link appears inside a sentence, add `inline` to get proper underline and spacing:

```tsx
// v9
<p>
  See the{' '}
  <Link href="/docs" inline>
    documentation
  </Link>{' '}
  for details.
</p>
```

Without `inline`, the link uses no underline by default — only appropriate in visually discrete nav areas.

## Subtle Appearance

```tsx
<Link href="/help" appearance="subtle">
  Help
</Link>
```

## Render as `<span>`

Renders as `<span role="button">` — wraps correctly in multiline text unlike `<button>`:

```tsx
<Link as="span" inline onClick={handleClick}>
  Terms of service
</Link>
```

## Accessibility Notes

Links **must** have an underline (use `inline`) unless they are in a visually discrete region containing only links or interactive controls, or all links have an icon indicating interactivity.
