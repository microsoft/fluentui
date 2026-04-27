import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs',
};

export const Inline = (): React.ReactNode => (
  <div className="p-16">
    <Popover inline positioning="below">
      <PopoverTrigger>
        <button className={classes.trigger}>Inline popover</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Inline rendering</h3>
        <p className="text-sm text-gray-600">
          This popover renders without the native HTML <code>popover</code> top-layer. It is still positioned via CSS
          Anchor Positioning, but stacks with regular z-index rather than being auto-elevated above siblings.
        </p>
      </PopoverSurface>
    </Popover>
  </div>
);
