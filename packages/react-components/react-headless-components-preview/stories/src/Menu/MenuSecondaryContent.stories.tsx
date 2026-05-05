import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[260px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center justify-between px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  shortcut: 'text-xs text-gray-400 font-mono ml-4',
};

export const SecondaryContent = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>Edit</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item} secondaryContent={<span className={classes.shortcut}>⌘X</span>}>
          Cut
        </MenuItem>
        <MenuItem className={classes.item} secondaryContent={<span className={classes.shortcut}>⌘C</span>}>
          Copy
        </MenuItem>
        <MenuItem className={classes.item} secondaryContent={<span className={classes.shortcut}>⌘V</span>}>
          Paste
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
