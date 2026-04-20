import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  wrapper: 'flex flex-col items-start gap-4 m-16',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs',
  note: 'text-xs text-gray-500 max-w-lg',
};

export const FallbackPositions = (): React.ReactNode => (
  <div className={classes.wrapper}>
    <Popover
      positioning={{
        position: 'above',
        align: 'center',
        fallbackPositions: ['below-start', 'after'],
      }}
    >
      <PopoverTrigger>
        <button className={classes.trigger}>Open near an edge</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>
        When <code>above</code> overflows the viewport, the browser walks <code>fallbackPositions</code> in order —
        first <code>below-start</code>, then <code>after</code> — and picks the first placement that fits.
      </PopoverSurface>
    </Popover>

    <p className={classes.note}>
      <code>fallbackPositions</code> accepts shorthand strings like <code>'below-start'</code>. Each entry is compiled
      into a <code>@position-try</code> rule so the browser can try them natively. When omitted, the default fallback is{' '}
      <code>flip-block, flip-inline</code>.
    </p>
  </div>
);
