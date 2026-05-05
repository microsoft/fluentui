import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[220px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  divider: 'my-1 h-px bg-gray-200 mx-1',
};

export const WithDivider = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>Actions</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item}>Cut</MenuItem>
        <MenuItem className={classes.item}>Copy</MenuItem>
        <MenuItem className={classes.item}>Paste</MenuItem>
        <MenuDivider className={classes.divider} />
        <MenuItem className={classes.item}>Delete</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
