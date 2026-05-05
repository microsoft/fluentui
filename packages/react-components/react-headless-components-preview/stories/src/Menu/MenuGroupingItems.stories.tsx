import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuGroupHeader,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[260px]',
  list: 'flex flex-col gap-0.5 outline-none',
  group: 'flex flex-col gap-0.5',
  header: 'px-3 pt-2 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  divider: 'my-1 h-px bg-gray-200 mx-1',
};

export const GroupingItems = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>Insert</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuGroup className={classes.group}>
          <MenuGroupHeader className={classes.header}>Document</MenuGroupHeader>
          <MenuItem className={classes.item}>Page</MenuItem>
          <MenuItem className={classes.item}>Section</MenuItem>
        </MenuGroup>
        <MenuDivider className={classes.divider} />
        <MenuGroup className={classes.group}>
          <MenuGroupHeader className={classes.header}>Media</MenuGroupHeader>
          <MenuItem className={classes.item}>Image</MenuItem>
          <MenuItem className={classes.item}>Video</MenuItem>
        </MenuGroup>
      </MenuList>
    </MenuPopover>
  </Menu>
);
