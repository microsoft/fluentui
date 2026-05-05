import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[200px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  target:
    'h-32 w-72 rounded-md border-2 border-dashed border-gray-300 grid place-items-center text-sm text-gray-500 cursor-context-menu select-none',
};

export const OpenOnContext = (): React.ReactNode => (
  <Menu openOnContext>
    <MenuTrigger>
      <div className={classes.target}>Right-click me</div>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item}>Cut</MenuItem>
        <MenuItem className={classes.item}>Copy</MenuItem>
        <MenuItem className={classes.item}>Paste</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
