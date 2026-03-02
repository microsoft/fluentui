# Button Migration

## Variant Mapping

| v8                     | v9                                | Notes                                     |
| ---------------------- | --------------------------------- | ----------------------------------------- |
| `DefaultButton`        | `Button`                          |                                           |
| `PrimaryButton`        | `Button appearance="primary"`     |                                           |
| `ActionButton`         | `Button appearance="transparent"` |                                           |
| `CommandButton`        | `MenuButton`                      | Use when triggering a menu                |
| `CommandBarButton`     | `ToolbarButton`                   | Inside a `Toolbar`; standalone → `Button` |
| `CompoundButton`       | `CompoundButton`                  | Same name, new package                    |
| `ContextualMenuButton` | `Menu` / `MenuButton`             |                                           |
| `Button split`         | `SplitButton`                     |                                           |
| `Button toggle`        | `ToggleButton`                    | Same name, new package                    |

## Before / After Examples

### PrimaryButton

```tsx
// v8
import { PrimaryButton } from '@fluentui/react';
<PrimaryButton text="Submit" onClick={handleSubmit} />;

// v9
import { Button } from '@fluentui/react-components';
<Button appearance="primary" onClick={handleSubmit}>
  Submit
</Button>;
```

### ActionButton with icon

```tsx
// v8
import { ActionButton } from '@fluentui/react';
<ActionButton iconProps={{ iconName: 'Add' }}>Add item</ActionButton>;

// v9
import { Button } from '@fluentui/react-components';
import { AddRegular } from '@fluentui/react-icons';
<Button appearance="transparent" icon={<AddRegular />}>
  Add item
</Button>;
```

### IconButton

```tsx
// v8
import { IconButton } from '@fluentui/react';
<IconButton iconProps={{ iconName: 'Settings' }} title="Settings" />;

// v9
import { Button } from '@fluentui/react-components';
import { SettingsRegular } from '@fluentui/react-icons';
<Button icon={<SettingsRegular />} aria-label="Settings" />;
```

### Button with href (navigation)

```tsx
// v8 — button that navigates via href
import { DefaultButton, PrimaryButton } from '@fluentui/react';
<DefaultButton href="/dashboard" target="_blank">
  Go to dashboard
</DefaultButton>;

// v9 option A — use Link for inline text-style navigation
import { Link } from '@fluentui/react-components';
<Link href="/dashboard" target="_blank">
  Go to dashboard
</Link>;

// v9 option B — use Button rendered as <a> to keep button appearance
import { Button } from '@fluentui/react-components';
<Button as="a" href="/dashboard" target="_blank" appearance="primary">
  Go to dashboard
</Button>;
```

`Button as="a"` renders the full button affordance as an anchor element (correct `<a>` in the DOM,
supports `href`, `target`, `rel`). Use `Link` for inline prose links; use `Button as="a"` when the
design needs a button shape that navigates.

### SplitButton

```tsx
// v8
import { DefaultButton } from '@fluentui/react';
<DefaultButton split menuProps={{ items: [...] }}>Action</DefaultButton>

// v9
import { SplitButton, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
<Menu positioning="below-end">
  <MenuTrigger>
    {(triggerProps) => <SplitButton menuButton={triggerProps}>Action</SplitButton>}
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem>Option 1</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>
```

## Button Shims (Incremental Migration)

All button variants have a shim in `@fluentui/react-migration-v8-v9` that accepts v8 props:

```tsx
// Swap the import — no other code changes needed
import {
  DefaultButtonShim as DefaultButton,
  PrimaryButtonShim as PrimaryButton,
  ActionButtonShim as ActionButton,
  CommandButtonShim as CommandButton,
  CompoundButtonShim as CompoundButton,
  MenuButtonShim as MenuButton,
  ToggleButtonShim as ToggleButton,
} from '@fluentui/react-migration-v8-v9';

// v8 props still work:
<PrimaryButton text="Submit" iconProps={{ iconName: 'Add' }} onClick={handler} />;
```

Replace shims with native v9 components (see examples above) when ready.

## Prop Mapping

| v8 `IButtonProps`     | v9 `ButtonProps`                         | Notes                                                     |
| --------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `allowDisabledFocus`  | `disabledFocusable`                      |                                                           |
| `ariaLabel`           | `aria-label`                             | Native HTML                                               |
| `ariaDescription`     | —                                        | Removed                                                   |
| `ariaHidden`          | `aria-hidden`                            | Native HTML                                               |
| `checked`             | `checked` (ToggleButton)                 |                                                           |
| `className`           | `className`                              |                                                           |
| `children`            | `children`                               |                                                           |
| `componentRef`        | `ref`                                    |                                                           |
| `data`                | —                                        | Removed                                                   |
| `disabled`            | `disabled`                               |                                                           |
| `href`                | `as="a"` + `href`                        | `<Button as="a" href="...">` or use `Link` for text links |
| `iconProps`           | `icon` (slot)                            | Pass `<IconComponent />`                                  |
| `menuAs`              | —                                        | Use `Menu` + HTML `as`                                    |
| `menuIconProps`       | `menuIcon` slot (MenuButton)             |                                                           |
| `menuProps`           | —                                        | Use `Menu` + `MenuButton`                                 |
| `onMenuClick`         | `onClick`                                | Native HTML                                               |
| `onRenderChildren`    | `children`                               |                                                           |
| `onRenderDescription` | `secondaryContent` slot (CompoundButton) |                                                           |
| `onRenderIcon`        | `icon` slot                              |                                                           |
| `onRenderMenuIcon`    | `icon` (MenuButton)                      |                                                           |
| `onRenderText`        | `children`                               |                                                           |
| `primary`             | `appearance="primary"`                   |                                                           |
| `primaryDisabled`     | —                                        | Use SplitButton                                           |
| `secondaryText`       | `secondaryContent` slot (CompoundButton) |                                                           |
| `split`               | —                                        | Use `SplitButton`                                         |
| `styles`              | `className` + `makeStyles`               |                                                           |
| `text`                | `children`                               | Move to JSX children                                      |
| `theme`               | —                                        | Use `FluentProvider`                                      |
| `toggle`              | —                                        | Use `ToggleButton`                                        |
| `uniqueId`            | `key`                                    | React key                                                 |
