# Separator → Divider Migration

This is a straightforward rename. `Separator` (v8) → `Divider` (v9). The core props carry over unchanged; custom styles move to `makeStyles` + `className`.

## Prop Mapping

| v8             | v9             | Notes                                                     |
| -------------- | -------------- | --------------------------------------------------------- |
| `alignContent` | `alignContent` | Unchanged                                                 |
| `children`     | `children`     | Content centered in the line                              |
| `vertical`     | `vertical`     | Unchanged                                                 |
| `styles`       | `className`    | Use `makeStyles`                                          |
| `theme`        | —              | Use `FluentProvider`                                      |
| —              | `appearance`   | New: `"default"` \| `"subtle"` \| `"brand"` \| `"strong"` |
| —              | `inset`        | New: adds padding on both ends                            |

## Before / After

```tsx
// v8
import { Separator } from '@fluentui/react';
<Separator vertical alignContent="end">
  Label
</Separator>;

// v9
import { Divider } from '@fluentui/react-components';
<Divider vertical alignContent="end">
  Label
</Divider>;
```

Custom styles:

```tsx
// v8
<Separator styles={{ root: { color: 'red' } }} />;

// v9
import { makeStyles, Divider } from '@fluentui/react-components';
const useStyles = makeStyles({ divider: { color: 'red' } });
const s = useStyles();
<Divider className={s.divider} />;
```
