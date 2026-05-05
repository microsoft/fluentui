import * as React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItemSwitch,
} from '@fluentui/react-headless-components-preview/menu';

const classes = {
  trigger: 'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[240px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'flex items-center justify-between gap-2 px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
  switch: 'menu-switch',
};

const styleBlock = `
  .menu-switch {
    width: 28px;
    height: 16px;
    border-radius: 9999px;
    background: rgb(229, 231, 235);
    position: relative;
    transition: background-color 0.15s;
    flex-shrink: 0;
  }
  .menu-switch::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    border-radius: 9999px;
    background: white;
    transition: transform 0.15s;
  }
  [aria-checked="true"] .menu-switch { background: rgb(37, 99, 235); }
  [aria-checked="true"] .menu-switch::after { transform: translateX(12px); }
`;

export const SwitchItem = (): React.ReactNode => (
  <>
    <style>{styleBlock}</style>
    <Menu persistOnItemClick>
      <MenuTrigger>
        <button className={classes.trigger}>View</button>
      </MenuTrigger>
      <MenuPopover className={classes.surface}>
        <MenuList className={classes.list}>
          <MenuItemSwitch
            className={classes.item}
            name="show"
            value="grid"
            switchIndicator={{ className: classes.switch, 'aria-hidden': true }}
          >
            Grid view
          </MenuItemSwitch>
          <MenuItemSwitch
            className={classes.item}
            name="show"
            value="hidden"
            switchIndicator={{ className: classes.switch, 'aria-hidden': true }}
          >
            Show hidden files
          </MenuItemSwitch>
        </MenuList>
      </MenuPopover>
    </Menu>
  </>
);
