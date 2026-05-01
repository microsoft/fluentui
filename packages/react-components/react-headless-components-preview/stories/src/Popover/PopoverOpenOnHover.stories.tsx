import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs',
};

export const OpenOnHover = (): React.ReactNode => (
  <Popover openOnHover>
    <PopoverTrigger>
      <button className={classes.trigger}>Hover me</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Hover popover</h3>
      <p className="text-sm text-gray-600">
        This popover opens when you hover over the trigger and closes when the mouse leaves both the trigger and the
        surface.
      </p>
    </PopoverSurface>
  </Popover>
);
