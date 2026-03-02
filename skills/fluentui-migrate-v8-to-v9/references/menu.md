# Menu Migration

## Architecture Change

In v8 menus are **data-driven**: pass an `items` array to `ContextualMenu` or `menuProps` on a button.

In v9 menus are **declarative**: compose JSX children under `Menu`.

## Before / After Example

```tsx
// v8 — data-driven
import { ContextualMenu, ContextualMenuItemType } from '@fluentui/react';

<ContextualMenu
  target={targetRef}
  items={[
    { key: 'new', text: 'New', onClick: handleNew },
    { key: 'div1', itemType: ContextualMenuItemType.Divider },
    { key: 'open', text: 'Open', iconProps: { iconName: 'FolderOpen' } },
    {
      key: 'recent',
      text: 'Recent',
      subMenuProps: {
        items: [{ key: 'file1', text: 'file1.txt' }],
      },
    },
  ]}
  onDismiss={handleDismiss}
/>;
```

```tsx
// v9 — declarative
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
} from '@fluentui/react-components';
import { FolderOpenRegular } from '@fluentui/react-icons';

<Menu>
  <MenuTrigger disableButtonEnhancement>
    <MenuButton>Open menu</MenuButton>
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem onClick={handleNew}>New</MenuItem>
      <MenuDivider />
      <MenuItem icon={<FolderOpenRegular />}>Open</MenuItem>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuItem hasSubmenu>Recent</MenuItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem>file1.txt</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </MenuList>
  </MenuPopover>
</Menu>;
```

## itemType Enum → Component Mapping

| v8 `ContextualMenuItemType` | v9 component                           |
| --------------------------- | -------------------------------------- |
| `Normal`                    | `MenuItem`                             |
| `Divider`                   | `MenuDivider`                          |
| `Header`                    | `MenuGroupHeader` (inside `MenuGroup`) |
| `Section`                   | `MenuGroup`                            |
| Checkable item (`canCheck`) | `MenuItemCheckbox`                     |
| Radio item                  | `MenuItemRadio`                        |
| Split item (`split`)        | `MenuSplitGroup`                       |

## IContextualMenuProps → MenuProps

| v8                | v9                           | Notes                                        |
| ----------------- | ---------------------------- | -------------------------------------------- |
| `items`           | children                     | JSX `MenuItem`, etc.                         |
| `hidden`          | `open` / `onOpenChange`      | Controlled via `MenuTrigger` / `MenuPopover` |
| `directionalHint` | `positioning`                |                                              |
| `onDismiss`       | `onOpenChange`               |                                              |
| `onItemClick`     | `onClick` on each `MenuItem` |                                              |
| `calloutProps`    | `MenuPopover` props          |                                              |
| `styles`          | `className` + `makeStyles`   |                                              |
| `theme`           | `FluentProvider`             |                                              |

## IContextualMenuItem → MenuItemProps

| v8                     | v9                                          | Notes                    |
| ---------------------- | ------------------------------------------- | ------------------------ |
| `text`                 | `children`                                  |                          |
| `key`                  | `key`                                       | React key                |
| `onClick`              | `onClick`                                   |                          |
| `disabled`             | `disabled`                                  |                          |
| `iconProps`            | `icon` slot                                 | Pass `<IconComponent />` |
| `secondaryText`        | `secondaryContent` slot                     |                          |
| `ariaLabel`            | `aria-label`                                |                          |
| `componentRef`         | `ref`                                       |                          |
| `items` (submenu)      | `children` inside nested `<Menu>`           |                          |
| `itemType`             | Use appropriate component (see table above) |                          |
| `canCheck` / `checked` | `MenuItemCheckbox` / `MenuItemRadio`        |                          |
| `split`                | `MenuSplitGroup`                            |                          |
| `style` / `styles`     | `className` + `makeStyles`                  |                          |
| `role`                 | —                                           | Set by component         |
| `inactive`             | —                                           | Removed                  |

## IContextualMenuSection → MenuGroup

| v8                             | v9                                    |
| ------------------------------ | ------------------------------------- |
| `title`                        | `MenuGroupHeader` children            |
| `items`                        | `MenuGroup` children                  |
| `topDivider` / `bottomDivider` | — Removed; add `MenuDivider` manually |

## MenuItemShim (Incremental Migration)

`MenuItemShim` accepts a v8 `IContextualMenuItem` object and renders a v9 `MenuItem`. Use it to keep existing `items` arrays working while the rest of the component migrates.

```tsx
import { MenuItemShim } from '@fluentui/react-migration-v8-v9';

// v8 items array can stay unchanged:
const items: IContextualMenuItem[] = [
  { key: 'new', text: 'New', onClick: handleNew },
  { key: 'open', text: 'Open', iconProps: { iconName: 'FolderOpen' } },
];

// Render inside v9 MenuList:
<MenuList>
  {items.map(item => (
    <MenuItemShim key={item.key} item={item} />
  ))}
</MenuList>;
```

Replace with native `MenuItem` JSX (see example above) when ready.
