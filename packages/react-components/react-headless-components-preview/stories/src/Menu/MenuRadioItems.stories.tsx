import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemRadio,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[220px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 aria-checked:bg-blue-50',
  dot: 'menu-radio-dot w-4 h-4 inline-grid place-items-center text-blue-600',
};

const styleBlock = `
  .menu-radio-dot { opacity: 0; transition: opacity 0.15s; }
  [aria-checked="true"] .menu-radio-dot { opacity: 1; }
`;

export const RadioItems = (): React.ReactNode => (
  <>
    <style>{styleBlock}</style>
    <Menu persistOnItemClick defaultCheckedValues={{ sortBy: ['name'] }}>
      <MenuTrigger>
        <button className={classes.trigger}>Sort by</button>
      </MenuTrigger>
      <MenuPopover className={classes.surface}>
        <MenuList className={classes.list} hasCheckmarks>
          <MenuItemRadio
            className={classes.item}
            name="sortBy"
            value="name"
            checkmark={{ className: classes.dot, 'aria-hidden': true, children: '●' }}
          >
            Name
          </MenuItemRadio>
          <MenuItemRadio
            className={classes.item}
            name="sortBy"
            value="size"
            checkmark={{ className: classes.dot, 'aria-hidden': true, children: '●' }}
          >
            Size
          </MenuItemRadio>
          <MenuItemRadio
            className={classes.item}
            name="sortBy"
            value="modified"
            checkmark={{ className: classes.dot, 'aria-hidden': true, children: '●' }}
          >
            Last modified
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);
