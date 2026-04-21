import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

import overflowBoundaryDescriptionMd from './PositioningOverflowBoundaryDescription.md';

const classes = {
  outer: 'w-full overflow-auto min-h-[400px]',
  wrapper: 'flex flex-col items-start gap-4 m-16',
  checkbox: 'flex items-center gap-2 text-sm text-gray-700',
  boundary:
    'relative border-2 border-dashed border-red-500 w-[300px] h-[300px] p-5 flex flex-col justify-between items-end box-border',
  trigger:
    'w-[150px] px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surfaceBase: 'box-border bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm',
  surfaceWider: 'w-[340px]',
};

export const OverflowBoundary = (): React.ReactNode => {
  const [open, setOpen] = React.useState(true);
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className={classes.outer}>
      <div className={classes.wrapper}>
        <label className={classes.checkbox}>
          <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
          <span>Open</span>
        </label>

        <div ref={setBoundary} className={classes.boundary}>
          <Popover
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{ position: 'below', align: 'start', overflowBoundary: boundary }}
          >
            <PopoverTrigger>
              <button className={classes.trigger}>Below</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surfaceBase}>
              Natural width is 240px. With <code>overflowBoundary</code> set, the hook caps <code>max-inline-size</code>{' '}
              to the room between the trigger&rsquo;s left edge and the boundary&rsquo;s right edge, so the
              surface&rsquo;s right edge lands exactly at the boundary.
            </PopoverSurface>
          </Popover>

          <Popover
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{ position: 'above', align: 'start' }}
          >
            <PopoverTrigger>
              <button className={classes.trigger}>Free</button>
            </PopoverTrigger>
            <PopoverSurface className={`${classes.surfaceBase}, ${classes.surfaceWider}`}>
              No <code>overflowBoundary</code> — the surface keeps its natural 340px width and spills past the dashed
              rect. Native CSS flip only checks the viewport, not this custom boundary.
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};

OverflowBoundary.parameters = {
  docs: {
    description: {
      story: overflowBoundaryDescriptionMd,
    },
  },
};
