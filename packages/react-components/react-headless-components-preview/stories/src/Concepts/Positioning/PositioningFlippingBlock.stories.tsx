import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';

import descriptionMd from './PositioningFlippingBlockDescription.md';

const classes = {
  page: 'flex flex-col gap-4 p-4',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'flip-demo bg-white rounded-md shadow-md border border-gray-200 p-2 w-[160px] text-xs',
};

export const FlippingBlock = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <div className={classes.grid}>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'above' }}>
          <PopoverTrigger>
            <button
              className={classes.trigger}
              style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}
            >
              trigger near top
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> above → flips below
          </PopoverSurface>
        </Popover>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'below' }}>
          <PopoverTrigger>
            <button
              className={classes.trigger}
              style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)' }}
            >
              trigger near bottom
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> below → flips above
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  </div>
);

FlippingBlock.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
