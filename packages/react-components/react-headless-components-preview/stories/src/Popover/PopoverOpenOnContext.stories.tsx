import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  trigger:
    'px-6 py-4 rounded-md bg-gray-100 text-gray-700 font-medium border border-dashed border-gray-400 cursor-context-menu focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px]',
  menuItem:
    'block w-full px-4 py-1.5 text-sm text-gray-700 text-left hover:bg-gray-100 cursor-pointer border-none bg-transparent',
};

export const OpenOnContext = (): React.ReactNode => (
  <Popover openOnContext>
    <PopoverTrigger>
      <div className={classes.trigger}>Right-click this area</div>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <button className={classes.menuItem}>Cut</button>
      <button className={classes.menuItem}>Copy</button>
      <button className={classes.menuItem}>Paste</button>
    </PopoverSurface>
  </Popover>
);
