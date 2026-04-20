import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  outer: 'w-full overflow-auto',
  wrapper: 'flex flex-col items-start gap-4 mx-16 my-16 w-max',
  row: 'flex items-center gap-3 text-sm text-gray-700',
  input: 'w-24 px-2 py-1 border border-gray-300 rounded',
  checkbox: 'flex items-center gap-2',
  boundary: 'relative border-2 border-dashed border-red-500 w-[300px] h-[300px] flex flex-col items-center p-2',
  trigger:
    'w-[150px] inline-flex justify-center px-3 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-1 overflow-auto flex flex-col gap-0.5 min-w-[150px]',
  item: 'px-3 py-1.5 rounded text-sm text-gray-800 hover:bg-gray-100 cursor-default whitespace-nowrap',
};

export const AutoSize = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);
  const [itemCount, setItemCount] = React.useState(10);
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className={classes.outer}>
      <div className={classes.wrapper}>
        <label className={classes.checkbox}>
          <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
          <span className="text-sm text-gray-700">Open</span>
        </label>
        <label className={classes.row}>
          <span>Menu item count</span>
          <input
            type="number"
            className={classes.input}
            min={1}
            value={itemCount}
            onChange={e => setItemCount(parseInt(e.target.value, 10) || 1)}
          />
        </label>

        <div ref={setBoundary} className={classes.boundary}>
          <Popover
            open={open}
            onOpenChange={(_, data) => setOpen(data.open)}
            positioning={{ position: 'below', autoSize: true, overflowBoundary: boundary, strategy: 'absolute' }}
          >
            <PopoverTrigger>
              <button className={classes.trigger}>AutoSized popover</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              {Array.from({ length: itemCount }, (_, i) => (
                <div key={i} className={classes.item}>
                  Item {i + 1}
                </div>
              ))}
            </PopoverSurface>
          </Popover>
        </div>

        <p className="text-xs text-gray-500 max-w-lg">
          <code>autoSize</code> sets inline <code>max-width</code> and <code>max-height</code> styles on the surface
          derived from <code>overflowBoundary</code> (here, the dashed 300×300 box). As the item count grows the popover
          clips to the boundary and scrolls instead of bursting outside.
        </p>
      </div>
    </div>
  );
};
