import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuSplitGroup,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[260px]',
  list: 'flex flex-col gap-0.5 outline-none',
  splitGroup: 'flex items-stretch gap-px',
  primary: 'flex-1 px-3 py-1.5 text-sm text-gray-900 rounded-l cursor-pointer hover:bg-gray-100',
  submenuTrigger:
    'px-2 py-1.5 text-sm text-gray-600 rounded-r cursor-pointer hover:bg-gray-100 grid place-items-center',
  submenu: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[180px]',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
};

const SubmenuTrigger = (): React.ReactElement => (
  <Menu>
    <MenuTrigger>
      <MenuItem className={classes.submenuTrigger} hasSubmenu submenuIndicator={<span aria-hidden>›</span>} />
    </MenuTrigger>
    <MenuPopover className={classes.submenu}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item}>Save as draft</MenuItem>
        <MenuItem className={classes.item}>Save as template</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

export const SplitMenuItem = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>Actions</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuSplitGroup className={classes.splitGroup}>
          <MenuItem className={classes.primary}>Save</MenuItem>
          <SubmenuTrigger />
        </MenuSplitGroup>
        <MenuItem className={classes.item}>Discard</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
