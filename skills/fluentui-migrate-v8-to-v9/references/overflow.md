# OverflowSet → Overflow Migration

v8 `OverflowSet` used render callbacks (`onRenderItem`, `onRenderOverflowButton`) with static `items` / `overflowItems` arrays. v9 `Overflow` is hook-based: every child wraps itself in `<OverflowItem>` and a set of utility hooks drives visibility and menu state.

## Architecture Shift

| v8 `OverflowSet`           | v9 `Overflow` + `OverflowItem`                |
| -------------------------- | --------------------------------------------- |
| `items` array prop         | `<OverflowItem>` children                     |
| `overflowItems` array prop | Detected automatically by the overflow engine |
| `onRenderItem` callback    | Each item renders itself                      |
| `onRenderOverflowButton`   | `useOverflowMenu` hook + `<Menu>` you compose |
| No priority concept        | `priority` prop on `<OverflowItem>`           |

## Key v9 Hooks

| Hook                       | Returns                                                        |
| -------------------------- | -------------------------------------------------------------- |
| `useOverflowMenu`          | `ref` to register the overflow button; `isOverflowing` boolean |
| `useIsOverflowItemVisible` | Whether a specific item is currently visible                   |
| `useOverflowCount`         | Number of currently hidden items                               |
| `useOverflowGroupVisible`  | Visibility of an overflow group                                |

## Prop Mapping — OverflowSet

| v8                       | v9 equivalent                                 | Notes |
| ------------------------ | --------------------------------------------- | ----- |
| `items`                  | `<OverflowItem id="...">` children            |       |
| `overflowItems`          | Auto-detected by `Overflow`                   |       |
| `onRenderItem`           | Item renders itself                           |       |
| `onRenderOverflowButton` | `useOverflowMenu` + your `<Menu>` composition |       |
| `vertical`               | `overflowAxis="vertical"` on `<Overflow>`     |       |
| `overflowMenuProps`      | Pass to your `<Menu>` directly                |       |
| `styles`                 | `className` + `makeStyles`                    |       |
| `role`                   | `role` on the container element               |       |

## OverflowItem Props

| Prop       | Type      | Notes                                                                    |
| ---------- | --------- | ------------------------------------------------------------------------ |
| `id`       | `string`  | Required; unique identifier used by the overflow engine                  |
| `priority` | `number`  | Higher = overflows later (mutually exclusive with `pinned`)              |
| `pinned`   | `boolean` | Never overflows (mutually exclusive with `priority`)                     |
| `groupId`  | `string`  | Assign to a group; watch group visibility with `useOverflowGroupVisible` |

## Before / After

```tsx
// v8 — render callbacks
import { OverflowSet } from '@fluentui/react';

<OverflowSet
  items={[
    { key: 'item1', name: 'Item 1', onClick: () => {} },
    { key: 'item2', name: 'Item 2', onClick: () => {} },
  ]}
  overflowItems={[{ key: 'overflow1', name: 'More', onClick: () => {} }]}
  onRenderItem={item => <CommandBarButton text={item.name} onClick={item.onClick} />}
  onRenderOverflowButton={items => <CommandBarButton menuProps={{ items }} text="..." />}
/>;

// v9 — hook-based composition
import {
  Overflow,
  OverflowItem,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useOverflowMenu,
  useIsOverflowItemVisible,
  makeStyles,
  mergeClasses,
} from '@fluentui/react-components';

const itemIds = ['item1', 'item2', 'item3'];

function OverflowMenuButton() {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  if (!isOverflowing) return null;
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button ref={ref}>+ more</Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {itemIds.map(id => (
            <OverflowMenuItem key={id} id={id} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
}

function OverflowMenuItem({ id }: { id: string }) {
  const isVisible = useIsOverflowItemVisible(id);
  if (isVisible) return null;
  return <MenuItem>{id}</MenuItem>;
}

<Overflow>
  <div style={{ display: 'flex', overflow: 'hidden' }}>
    {itemIds.map(id => (
      <OverflowItem key={id} id={id}>
        <Button>{id}</Button>
      </OverflowItem>
    ))}
    <OverflowMenuButton />
  </div>
</Overflow>;
```

> **Note**: `OverflowItem` children must use `React.forwardRef` if they are custom components.
