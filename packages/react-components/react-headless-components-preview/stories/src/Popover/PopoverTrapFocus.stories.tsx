import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm',
  input:
    'w-full px-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-2 focus:outline-blue-500 focus:border-transparent',
  button:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
};

export const TrapFocus = (): React.ReactNode => (
  <Popover trapFocus>
    <PopoverTrigger>
      <button className={classes.trigger}>Open dialog popover</button>
    </PopoverTrigger>
    <PopoverSurface className={classes.surface}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Subscribe</h3>
      <div className="flex flex-col gap-3">
        <label className="text-sm text-gray-600">
          Email
          <input type="email" placeholder="you@example.com" className={classes.input} />
        </label>
        <div className="flex justify-end gap-2">
          <button className={classes.button}>Submit</button>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">Focus is trapped inside this surface. Press Escape to close.</p>
    </PopoverSurface>
  </Popover>
);
