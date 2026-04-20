import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  outer: 'w-full overflow-auto',
  wrapper: 'flex flex-col items-start gap-6 mx-32 my-16 w-max',
  row: 'flex items-center gap-3 text-sm text-gray-700',
  input: 'w-20 px-2 py-1 border border-gray-300 rounded',
  trigger:
    'inline-flex w-fit px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2 text-sm w-40',
  group: 'flex flex-col items-start gap-2',
  label: 'text-xs font-semibold text-gray-500 uppercase tracking-wide',
};

export const Offset = (): React.ReactNode => {
  const [mainAxis, setMainAxis] = React.useState(10);
  const [crossAxis, setCrossAxis] = React.useState(0);

  return (
    <div className={classes.outer}>
      <div className={classes.wrapper}>
        <label className={classes.row}>
          <code>mainAxis</code>
          <input
            type="number"
            className={classes.input}
            value={mainAxis}
            onChange={e => setMainAxis(parseInt(e.target.value, 10) || 0)}
          />
        </label>
        <label className={classes.row}>
          <code>crossAxis</code>
          <input
            type="number"
            className={classes.input}
            value={crossAxis}
            onChange={e => setCrossAxis(parseInt(e.target.value, 10) || 0)}
          />
        </label>

        <div className={classes.group}>
          <span className={classes.label}>offset: number (mainAxis only)</span>
          <Popover positioning={{ position: 'after', offset: mainAxis }}>
            <PopoverTrigger>
              <button className={classes.trigger}>Number offset</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>Container</PopoverSurface>
          </Popover>
        </div>

        <div className={classes.group}>
          <span className={classes.label}>offset: {'{ mainAxis, crossAxis }'}</span>
          <Popover positioning={{ position: 'after', offset: { mainAxis, crossAxis } }}>
            <PopoverTrigger>
              <button className={classes.trigger}>Object offset</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>Container</PopoverSurface>
          </Popover>
        </div>
      </div>
    </div>
  );
};
