import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  outer: 'w-full overflow-auto min-h-[400px]',
  wrapper: 'flex flex-col items-start gap-4 m-16',
  checkbox: 'flex items-center gap-2 text-sm text-gray-700',
  boundary:
    'relative border-2 border-dashed border-red-500 w-[300px] h-[300px] p-5 flex flex-col justify-between items-end box-border',
  trigger:
    'w-[150px] px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  boundedSurface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm overflow-auto',
  freeSurface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-3 text-sm w-64 overflow-auto',
  note: 'text-xs text-gray-500 max-w-lg',
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
            positioning={{ position: 'below', align: 'start', autoSize: 'width', overflowBoundary: boundary }}
          >
            <PopoverTrigger>
              <button className={classes.trigger}>Bounded</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.boundedSurface}>
              Stays within the overflow boundary — <code>autoSize</code> + <code>overflowBoundary</code> clamps
              max-width to the space between the trigger's left edge and the dashed box's right edge, so this popover
              wraps to fit.
            </PopoverSurface>
          </Popover>

          <Popover
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{ position: 'below', align: 'start' }}
          >
            <PopoverTrigger>
              <button className={classes.trigger}>Free</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.freeSurface}>
              Overflows the overflow boundary — no <code>overflowBoundary</code> is set and the surface carries an
              explicit <code>w-64</code>, so it keeps its natural 256px width and extends past the dashed box.
            </PopoverSurface>
          </Popover>
        </div>

        <p className={classes.note}>
          <code>overflowBoundary</code> tells the positioning hook which element to treat as the clip area for
          <code> autoSize</code>. The bounded popover's <code>max-width</code> (and <code>max-height</code> when
          <code> autoSize: true</code>) is derived from that element's rect and kept in sync via a{' '}
          <code>ResizeObserver</code>. Without <code>overflowBoundary</code>, <code>autoSize</code> falls back to the
          viewport — and when <code>autoSize</code> is off entirely, the surface sizes freely and can extend past the
          boundary.
        </p>
      </div>
    </div>
  );
};
