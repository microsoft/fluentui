import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemCheckbox,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[240px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center gap-2 px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100 aria-checked:bg-blue-50',
  check: 'menu-check w-4 h-4 inline-grid place-items-center text-blue-600',
};

const styleBlock = `
  .menu-check { opacity: 0; transition: opacity 0.15s; }
  [aria-checked="true"] .menu-check { opacity: 1; }
`;

export const CheckboxItems = (): React.ReactNode => (
  <>
    <style>{styleBlock}</style>
    <Menu persistOnItemClick>
      <MenuTrigger>
        <button className={classes.trigger}>Filters</button>
      </MenuTrigger>
      <MenuPopover className={classes.surface}>
        <MenuList className={classes.list} hasCheckmarks>
          <MenuItemCheckbox
            className={classes.item}
            name="filters"
            value="bold"
            checkmark={{ className: classes.check, 'aria-hidden': true, children: '✓' }}
          >
            Bold
          </MenuItemCheckbox>
          <MenuItemCheckbox
            className={classes.item}
            name="filters"
            value="italic"
            checkmark={{ className: classes.check, 'aria-hidden': true, children: '✓' }}
          >
            Italic
          </MenuItemCheckbox>
          <MenuItemCheckbox
            className={classes.item}
            name="filters"
            value="underline"
            checkmark={{ className: classes.check, 'aria-hidden': true, children: '✓' }}
          >
            Underline
          </MenuItemCheckbox>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);
