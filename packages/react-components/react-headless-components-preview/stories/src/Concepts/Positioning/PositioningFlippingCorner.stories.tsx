import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';

import descriptionMd from './PositioningFlippingCornerDescription.md';

const classes = {
  page: 'flex flex-col gap-4 p-4',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'bg-white rounded-md shadow-md border border-gray-200 p-3 w-[320px] max-h-[140px] text-sm',
};

export const FlippingCorner = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <div className={classes.grid}>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'above', align: 'end' }}>
          <PopoverTrigger>
            <button className={classes.trigger} style={{ position: 'absolute', top: 12, left: 12 }}>
              top-left · requested above-end
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> above-end → below-start
          </PopoverSurface>
        </Popover>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'above', align: 'start' }}>
          <PopoverTrigger>
            <button className={classes.trigger} style={{ position: 'absolute', top: 12, right: 12 }}>
              top-right · requested above-start
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> above-start → below-end
          </PopoverSurface>
        </Popover>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'below', align: 'end' }}>
          <PopoverTrigger>
            <button className={classes.trigger} style={{ position: 'absolute', bottom: 12, left: 12 }}>
              bottom-left · requested below-end
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> below-end → above-start
          </PopoverSurface>
        </Popover>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover inline open positioning={{ position: 'below', align: 'start' }}>
          <PopoverTrigger>
            <button className={classes.trigger} style={{ position: 'absolute', bottom: 12, right: 12 }}>
              bottom-right · requested below-start
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> below-start → above-end
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  </div>
);

FlippingCorner.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
