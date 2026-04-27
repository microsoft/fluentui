import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

const classes = {
  outer: 'w-full overflow-auto',
  wrapper: 'grid grid-cols-[repeat(3,auto)] grid-rows-[repeat(5,auto)] gap-16 mx-32 my-16 w-max',
  trigger:
    'h-12 w-32 flex items-center justify-center px-3 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 cursor-pointer border-none',
  surface:
    'bg-white/95 rounded-lg shadow-lg border border-gray-200 px-4 py-3 text-sm w-56 h-28 flex items-center justify-center',
};

const cells: Array<{
  label: string;
  position: NonNullable<PositioningProps['position']>;
  align: NonNullable<PositioningProps['align']>;
  gridClass: string;
}> = [
  { label: 'above-start', position: 'above', align: 'start', gridClass: 'row-start-1 col-start-1' },
  { label: 'above', position: 'above', align: 'center', gridClass: 'row-start-1 col-start-2' },
  { label: 'above-end', position: 'above', align: 'end', gridClass: 'row-start-1 col-start-3' },
  { label: 'before-top', position: 'before', align: 'start', gridClass: 'row-start-2 col-start-1' },
  { label: 'before', position: 'before', align: 'center', gridClass: 'row-start-3 col-start-1' },
  { label: 'before-bottom', position: 'before', align: 'end', gridClass: 'row-start-4 col-start-1' },
  { label: 'after-top', position: 'after', align: 'start', gridClass: 'row-start-2 col-start-3' },
  { label: 'after', position: 'after', align: 'center', gridClass: 'row-start-3 col-start-3' },
  { label: 'after-bottom', position: 'after', align: 'end', gridClass: 'row-start-4 col-start-3' },
  { label: 'below-start', position: 'below', align: 'start', gridClass: 'row-start-5 col-start-1' },
  { label: 'below', position: 'below', align: 'center', gridClass: 'row-start-5 col-start-2' },
  { label: 'below-end', position: 'below', align: 'end', gridClass: 'row-start-5 col-start-3' },
];

export const CoverTarget = (): React.ReactNode => (
  <div className={classes.outer}>
    <div className={classes.wrapper}>
      {cells.map(cell => (
        <div key={cell.label} className={cell.gridClass}>
          <Popover positioning={{ position: cell.position, align: cell.align, coverTarget: true }}>
            <PopoverTrigger>
              <button className={classes.trigger}>{cell.label}</button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>Container</PopoverSurface>
          </Popover>
        </div>
      ))}
    </div>
  </div>
);
