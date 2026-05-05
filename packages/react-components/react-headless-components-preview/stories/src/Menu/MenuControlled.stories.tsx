import * as React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-headless-components-preview/menu';

const classes = {
  toggle: 'px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 cursor-pointer border-none',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[200px]',
  list: 'flex flex-col gap-0.5 outline-none',
  item: 'px-3 py-1.5 text-sm text-gray-900 rounded cursor-pointer hover:bg-gray-100',
};

export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 items-start">
      <button className={classes.toggle} onClick={() => setOpen(value => !value)}>
        Toggle from outside (open: {String(open)})
      </button>
      <Menu open={open} onOpenChange={(_, data) => setOpen(data.open)}>
        <MenuTrigger>
          <button className={classes.trigger}>Open menu</button>
        </MenuTrigger>
        <MenuPopover className={classes.surface}>
          <MenuList className={classes.list}>
            <MenuItem className={classes.item}>One</MenuItem>
            <MenuItem className={classes.item}>Two</MenuItem>
            <MenuItem className={classes.item}>Three</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};
