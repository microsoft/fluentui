import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs',
};

export const Default = (): React.ReactNode => (
  <Popover>
    <PopoverTrigger>
      <button className={classes.trigger}>Show popover</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Popover title</h3>
      <p className="text-sm text-gray-600">
        This is the content of the popover. Click the trigger again or press Escape to close.
      </p>
    </PopoverSurface>
  </Popover>
);
