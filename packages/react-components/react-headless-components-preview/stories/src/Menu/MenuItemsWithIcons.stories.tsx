import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[220px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  icon: 'w-4 h-4 inline-grid place-items-center text-gray-500',
};

const Icon = ({ children }: { children: React.ReactNode }): React.ReactElement => (
  <span aria-hidden className={classes.icon}>
    {children}
  </span>
);

export const ItemsWithIcons = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>File</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item} icon={<Icon>📄</Icon>}>
          New
        </MenuItem>
        <MenuItem className={classes.item} icon={<Icon>📂</Icon>}>
          Open
        </MenuItem>
        <MenuItem className={classes.item} icon={<Icon>💾</Icon>}>
          Save
        </MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
