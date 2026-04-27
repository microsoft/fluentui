import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';

import descriptionMd from './PositioningFlippingInlineDescription.md';

const classes = {
  page: 'flex flex-col gap-6 p-4',
  sectionLabel: 'text-xs font-semibold uppercase tracking-wide text-gray-500',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'flip-demo bg-white rounded-md shadow-md border border-gray-200 p-3 min-w-[200px] max-w-xs text-sm',
};

export const FlippingInline = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <section className="flex flex-col gap-2">
      <div className={classes.sectionLabel}>Headless (native position-try-fallbacks)</div>
      <div className={classes.grid}>
        <div className={demoBoxClass} style={demoBoxStyle}>
          <Popover open positioning={{ position: 'before' }}>
            <PopoverTrigger>
              <button
                className={classes.trigger}
                style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
              >
                trigger on left
              </button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              <strong>Requested:</strong> before → flips after
            </PopoverSurface>
          </Popover>
        </div>

        <div className={demoBoxClass} style={demoBoxStyle}>
          <Popover open positioning={{ position: 'after' }}>
            <PopoverTrigger>
              <button
                className={classes.trigger}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
              >
                trigger on right
              </button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              <strong>Requested:</strong> after → flips before
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </section>
  </div>
);

FlippingInline.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
