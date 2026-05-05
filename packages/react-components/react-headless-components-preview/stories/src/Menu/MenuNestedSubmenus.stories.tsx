import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[220px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center justify-between px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  chevron: 'text-gray-400 ml-4',
};

const Submenu = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Menu>
    <MenuTrigger>
      <MenuItem
        className={classes.item}
        hasSubmenu
        submenuIndicator={
          <span aria-hidden className={classes.chevron}>
            ›
          </span>
        }
      >
        {label}
      </MenuItem>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>{children}</MenuList>
    </MenuPopover>
  </Menu>
);

export const NestedSubmenus = (): React.ReactNode => (
  <Menu>
    <MenuTrigger>
      <button className={classes.trigger}>File</button>
    </MenuTrigger>
    <MenuPopover className={classes.surface}>
      <MenuList className={classes.list}>
        <MenuItem className={classes.item}>New</MenuItem>
        <Submenu label="Open recent">
          <MenuItem className={classes.item}>Document.docx</MenuItem>
          <MenuItem className={classes.item}>Spreadsheet.xlsx</MenuItem>
          <Submenu label="Older">
            <MenuItem className={classes.item}>2024 archive</MenuItem>
            <MenuItem className={classes.item}>2023 archive</MenuItem>
          </Submenu>
        </Submenu>
        <MenuItem className={classes.item}>Save</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);
