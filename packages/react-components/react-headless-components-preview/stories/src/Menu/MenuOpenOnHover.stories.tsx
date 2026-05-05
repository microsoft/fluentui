import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[200px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
};

export const OpenOnHover = (): React.ReactNode => (
  <Menu openOnHover>
    <MenuTrigger>
      <button className={classes.trigger}>Hover me</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item}>Item 1</MenuItem>
        <MenuItem className={classes.item}>Item 2</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
