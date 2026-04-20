import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[240px] max-w-xs',
  checkbox: 'flex items-center gap-2 mb-4 text-sm text-gray-700',
};

export const Controlled = (): React.ReactNode => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      <label className={classes.checkbox}>
        <input type="checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
        Popover open
      </label>
      <Popover open={open} onOpenChange={(_e, data) => setOpen(data.open)}>
        <PopoverTrigger>
          <button className={classes.trigger}>Controlled popover</button>
        </PopoverTrigger>
        <PopoverSurface className={classes.surface}>
          <p className="text-sm text-gray-600">
            This popover is controlled externally. Toggle the checkbox above or click the trigger to open and close it.
          </p>
        </PopoverSurface>
      </Popover>
    </div>
  );
};
