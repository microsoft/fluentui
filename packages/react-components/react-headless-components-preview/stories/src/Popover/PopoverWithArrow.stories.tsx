import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';

const classes = {
  wrapper: 'flex flex-col items-start gap-4 p-16',
  trigger:
    'px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: [
    // Base surface look
    'bg-white rounded-lg p-4 min-w-[240px] max-w-xs overflow-visible',
    '[filter:drop-shadow(0_0_1px_rgba(0,0,0,0.12))_drop-shadow(0_4px_8px_rgba(0,0,0,0.14))]',
    // Arrow base (the rotated square rendered by withArrow)
    '[&_[data-arrow]]:absolute [&_[data-arrow]]:w-3 [&_[data-arrow]]:h-3 [&_[data-arrow]]:bg-white [&_[data-arrow]]:rotate-45',
    // Main-axis offset — arrow protrudes from the side that faces the trigger
    "[&[data-placement^='above']_[data-arrow]]:-bottom-1.5",
    "[&[data-placement^='below']_[data-arrow]]:-top-1.5",
    "[&[data-placement^='before']_[data-arrow]]:-right-1.5",
    "[&[data-placement^='after']_[data-arrow]]:-left-1.5",
    // Cross-axis centering for the plain (center-aligned) placements
    "[&[data-placement='above']_[data-arrow]]:inset-x-0 [&[data-placement='above']_[data-arrow]]:mx-auto",
    "[&[data-placement='below']_[data-arrow]]:inset-x-0 [&[data-placement='below']_[data-arrow]]:mx-auto",
    "[&[data-placement='before']_[data-arrow]]:inset-y-0 [&[data-placement='before']_[data-arrow]]:my-auto",
    "[&[data-placement='after']_[data-arrow]]:inset-y-0 [&[data-placement='after']_[data-arrow]]:my-auto",
    // Start/end-aligned placements — arrow pinned via logical inset, padding from --arrow-padding
    "[&[data-placement$='-start']_[data-arrow]]:start-[var(--arrow-padding,12px)]",
    "[&[data-placement$='-end']_[data-arrow]]:end-[var(--arrow-padding,12px)]",
  ].join(' '),
};

export const WithArrow = (): React.ReactNode => (
  <div className={classes.wrapper}>
    <Popover withArrow positioning={{ position: 'below', offset: 10 }}>
      <PopoverTrigger>
        <button className={classes.trigger}>Center-aligned</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Arrow popover</h3>
        <p className="text-sm text-gray-600">
          Arrow orientation follows the <code>data-placement</code> attribute, which <code>usePositioning</code> keeps
          in sync with the actual placement as you scroll or resize.
        </p>
      </PopoverSurface>
    </Popover>

    <Popover withArrow positioning={{ position: 'below', align: 'start', offset: 10 }}>
      <PopoverTrigger>
        <button className={classes.trigger}>Start-aligned (--arrow-padding: 16px)</button>
      </PopoverTrigger>
      <PopoverSurface className={classes.surface} style={{ '--arrow-padding': '16px' } as React.CSSProperties}>
        <h3 className="text-sm font-semibold text-gray-900 mb-1">Arrow padded from corner</h3>
        <p className="text-sm text-gray-600">
          Arrow positioning is fully CSS-owned. For start/end alignments, the Tailwind variant reads{' '}
          <code>var(--arrow-padding, 12px)</code>; this surface overrides the fallback by setting{' '}
          <code>--arrow-padding: 16px</code> in its inline <code>style</code>.
        </p>
      </PopoverSurface>
    </Popover>
  </div>
);
