# Toolbar Migration (CommandBar → Toolbar)

## Architecture Change

v8 `CommandBar` is **data-driven**: items are passed as `ICommandBarItemProps[]` arrays —
one for primary items, one for overflow items, one for far-right items.

v9 `Toolbar` is **declarative**: items are JSX children using `ToolbarButton`,
`ToolbarToggleButton`, `ToolbarDivider`, etc. Overflow requires the `Overflow` + `OverflowItem`
pattern from `@fluentui/react-components`.

## Before / After Example

```tsx
// v8 — CommandBar
import { CommandBar, ICommandBarItemProps } from '@fluentui/react';

const items: ICommandBarItemProps[] = [
  { key: 'new', text: 'New', iconProps: { iconName: 'Add' }, onClick: handleNew },
  { key: 'edit', text: 'Edit', iconProps: { iconName: 'Edit' }, onClick: handleEdit },
  { key: 'delete', text: 'Delete', iconProps: { iconName: 'Delete' }, disabled: true },
];

const farItems: ICommandBarItemProps[] = [
  { key: 'info', text: 'Info', iconProps: { iconName: 'Info' }, onClick: handleInfo },
];

<CommandBar items={items} farItems={farItems} />;
```

```tsx
// v9 — Toolbar
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-components';
import { AddRegular, EditRegular, DeleteRegular, InfoRegular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({ spacer: { marginLeft: 'auto' } });

function MyToolbar() {
  const s = useStyles();
  return (
    <Toolbar>
      <ToolbarButton icon={<AddRegular />} onClick={handleNew}>
        New
      </ToolbarButton>
      <ToolbarButton icon={<EditRegular />} onClick={handleEdit}>
        Edit
      </ToolbarButton>
      <ToolbarButton icon={<DeleteRegular />} disabled>
        Delete
      </ToolbarButton>
      {/* farItems equivalent: push to far end with marginLeft: auto */}
      <ToolbarDivider className={s.spacer} />
      <ToolbarButton icon={<InfoRegular />} onClick={handleInfo}>
        Info
      </ToolbarButton>
    </Toolbar>
  );
}
```

## CommandBarButton → ToolbarButton

`CommandBarButton` maps to `ToolbarButton` when used inside a `CommandBar` / `Toolbar`.
When used standalone (outside a CommandBar), replace with `Button`.

```tsx
// v8
import { CommandBarButton } from '@fluentui/react';
<CommandBarButton iconProps={{ iconName: 'Add' }}>New</CommandBarButton>;

// v9 — inside Toolbar
import { ToolbarButton } from '@fluentui/react-components';
import { AddRegular } from '@fluentui/react-icons';
<ToolbarButton icon={<AddRegular />}>New</ToolbarButton>;
```

## Toggle Items

```tsx
// v8 — checked CommandBar item
const items: ICommandBarItemProps[] = [
  { key: 'bold', text: 'Bold', iconProps: { iconName: 'Bold' }, checked: isBold, onClick: toggleBold },
];

// v9 — ToolbarToggleButton
import { ToolbarToggleButton } from '@fluentui/react-components';
import { TextBoldRegular } from '@fluentui/react-icons';

<ToolbarToggleButton icon={<TextBoldRegular />} checked={isBold} onClick={toggleBold}>
  Bold
</ToolbarToggleButton>;
```

## SubMenu Items

```tsx
// v8 — subMenuProps on a CommandBar item
const items: ICommandBarItemProps[] = [
  {
    key: 'export',
    text: 'Export',
    iconProps: { iconName: 'Export' },
    subMenuProps: {
      items: [
        { key: 'csv', text: 'Export as CSV', onClick: exportCsv },
        { key: 'pdf', text: 'Export as PDF', onClick: exportPdf },
      ],
    },
  },
];

// v9 — wrap ToolbarButton in Menu as the trigger
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, ToolbarButton } from '@fluentui/react-components';
import { ExportRegular } from '@fluentui/react-icons';

<Menu>
  <MenuTrigger disableButtonEnhancement>
    <ToolbarButton icon={<ExportRegular />}>Export</ToolbarButton>
  </MenuTrigger>
  <MenuPopover>
    <MenuList>
      <MenuItem onClick={exportCsv}>Export as CSV</MenuItem>
      <MenuItem onClick={exportPdf}>Export as PDF</MenuItem>
    </MenuList>
  </MenuPopover>
</Menu>;
```

## Radio Group (Mutually Exclusive Toggle Items)

v8 used `checked` items inside a data-driven CommandBar with manual mutual-exclusion logic. v9 provides `ToolbarRadioGroup` + `ToolbarRadioButton`:

```tsx
import { Toolbar, ToolbarRadioGroup, ToolbarRadioButton } from '@fluentui/react-components';
import { AlignLeftRegular, AlignCenterRegular, AlignRightRegular } from '@fluentui/react-icons';

const [align, setAlign] = React.useState('left');

<Toolbar checkedValues={{ align: [align] }} onCheckedValueChange={(_, data) => setAlign(data.checkedItems[0])}>
  <ToolbarRadioGroup>
    <ToolbarRadioButton name="align" value="left" icon={<AlignLeftRegular />}>
      Left
    </ToolbarRadioButton>
    <ToolbarRadioButton name="align" value="center" icon={<AlignCenterRegular />}>
      Center
    </ToolbarRadioButton>
    <ToolbarRadioButton name="align" value="right" icon={<AlignRightRegular />}>
      Right
    </ToolbarRadioButton>
  </ToolbarRadioGroup>
</Toolbar>;
```

## Overflow Handling

v8 `CommandBar` handles overflow automatically via the `overflowItems` array.
v9 requires the `Overflow` + `OverflowItem` pattern:

```tsx
import {
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Overflow,
  OverflowItem,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';
import { AddRegular, EditRegular, DeleteRegular, MoreHorizontalRegular } from '@fluentui/react-icons';

// Overflow menu — shows only items currently hidden by Overflow
const OverflowMenuItems = () => {
  const isNew = useIsOverflowItemVisible('new');
  const isEdit = useIsOverflowItemVisible('edit');
  const isDelete = useIsOverflowItemVisible('delete');
  return (
    <>
      {!isNew && <MenuItem onClick={handleNew}>New</MenuItem>}
      {!isEdit && <MenuItem onClick={handleEdit}>Edit</MenuItem>}
      {!isDelete && <MenuItem disabled>Delete</MenuItem>}
    </>
  );
};

const OverflowMenuButton = () => {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>();
  if (!isOverflowing) return null;
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <ToolbarButton ref={ref} icon={<MoreHorizontalRegular />} aria-label="More actions" />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <OverflowMenuItems />
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

function ToolbarWithOverflow() {
  return (
    <Overflow>
      <Toolbar>
        <OverflowItem id="new">
          <ToolbarButton icon={<AddRegular />} onClick={handleNew}>
            New
          </ToolbarButton>
        </OverflowItem>
        <OverflowItem id="edit">
          <ToolbarButton icon={<EditRegular />} onClick={handleEdit}>
            Edit
          </ToolbarButton>
        </OverflowItem>
        <OverflowItem id="delete">
          <ToolbarButton icon={<DeleteRegular />} disabled>
            Delete
          </ToolbarButton>
        </OverflowItem>
        <OverflowMenuButton />
      </Toolbar>
    </Overflow>
  );
}
```

## ICommandBarProps → ToolbarProps

| v8                 | v9                                      | Notes                                                     |
| ------------------ | --------------------------------------- | --------------------------------------------------------- |
| `items`            | `children` (`ToolbarButton`, etc.)      | JSX children replace the items array                      |
| `overflowItems`    | `Overflow` + `OverflowItem` pattern     | See overflow example above                                |
| `farItems`         | `ToolbarDivider` + `marginLeft: 'auto'` | Push items to the far end with a styled divider or spacer |
| `buttonAs`         | —                                       | Wrap in `ToolbarButton` directly                          |
| `overflowButtonAs` | Custom `ToolbarButton` in overflow menu | See overflow example above                                |
| `className`        | `className`                             |                                                           |
| `styles`           | `className` + `makeStyles`              |                                                           |
| `theme`            | `FluentProvider`                        |                                                           |

## ICommandBarItemProps → ToolbarButton Props

| v8 item prop   | v9                                 | Notes                                 |
| -------------- | ---------------------------------- | ------------------------------------- |
| `text`         | `children`                         | Move to JSX children                  |
| `key`          | `key`                              | React key on the JSX element          |
| `iconProps`    | `icon` slot                        | Pass `<IconComponent />`              |
| `onClick`      | `onClick`                          |                                       |
| `disabled`     | `disabled`                         |                                       |
| `checked`      | `checked` on `ToolbarToggleButton` | Use `ToolbarToggleButton`             |
| `subMenuProps` | Wrap in `Menu` + `MenuTrigger`     | See subMenu example above             |
| `split`        | `SplitButton`                      | See button.md for SplitButton pattern |
| `iconOnly`     | No `children`, add `aria-label`    | Keep `icon` slot, omit text children  |
| `ariaLabel`    | `aria-label`                       |                                       |
| `styles`       | `className` + `makeStyles`         |                                       |
