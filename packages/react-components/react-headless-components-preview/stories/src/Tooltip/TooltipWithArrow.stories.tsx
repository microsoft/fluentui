import * as React from 'react';
import { Tooltip } from '@fluentui/react-headless-components-preview/tooltip';

const contentClass = [
  'bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md overflow-visible',
  // Arrow base (the rotated square rendered by withArrow)
  '[&_[data-arrow]]:absolute [&_[data-arrow]]:w-2 [&_[data-arrow]]:h-2 [&_[data-arrow]]:bg-gray-900 [&_[data-arrow]]:rotate-45',
  // Main-axis offset
  "[&[data-placement^='above']_[data-arrow]]:-bottom-1",
  "[&[data-placement^='below']_[data-arrow]]:-top-1",
  "[&[data-placement^='before']_[data-arrow]]:-right-1",
  "[&[data-placement^='after']_[data-arrow]]:-left-1",
  // Cross-axis centering
  "[&[data-placement='above']_[data-arrow]]:inset-x-0 [&[data-placement='above']_[data-arrow]]:mx-auto",
  "[&[data-placement='below']_[data-arrow]]:inset-x-0 [&[data-placement='below']_[data-arrow]]:mx-auto",
  "[&[data-placement='before']_[data-arrow]]:inset-y-0 [&[data-placement='before']_[data-arrow]]:my-auto",
  "[&[data-placement='after']_[data-arrow]]:inset-y-0 [&[data-placement='after']_[data-arrow]]:my-auto",
  // Start/end-aligned placements
  "[&[data-placement$='-start']_[data-arrow]]:start-[var(--arrow-padding,8px)]",
  "[&[data-placement$='-end']_[data-arrow]]:end-[var(--arrow-padding,8px)]",
].join(' ');

export const WithArrow = (): React.ReactNode => (
  <div className="flex flex-col items-start gap-4 p-16">
    <Tooltip
      relationship="description"
      content={{ className: contentClass, children: 'Center-aligned tooltip' }}
      withArrow
      positioning={{ position: 'below', offset: 10 }}
    >
      <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer">
        Center-aligned
      </button>
    </Tooltip>

    <Tooltip
      relationship="description"
      positioning={{ position: 'below', align: 'start', offset: 10 }}
      content={{ className: contentClass, children: 'Start-aligned tooltip' }}
      withArrow
    >
      <button className="px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 text-sm cursor-pointer">
        Start-aligned
      </button>
    </Tooltip>
  </div>
);
