import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemLink,
  MenuItem,
  MenuDivider,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[220px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'block px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 no-underline',
  divider: 'my-1 h-px bg-gray-200 mx-1',
};

export const ItemLink = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>Help</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItemLink className={classes.item} href="https://react.fluentui.dev/" target="_blank" rel="noreferrer">
          Documentation
        </MenuItemLink>
        <MenuItemLink
          className={classes.item}
          href="https://github.com/microsoft/fluentui"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </MenuItemLink>
        <MenuDivider className={classes.divider} />
        <MenuItem className={classes.item}>About</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
