import * as React from 'react';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningFlippingInlineDescription.md';

const classes = {
  page: 'flex flex-col gap-4 p-4',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'flip-demo bg-white rounded-md shadow-md border border-gray-200 p-2 w-[160px] text-xs',
};

export const FlippingInline = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <div className={classes.grid}>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'before' }}
          surfaceClassName={classes.surface}
          trigger={
            <button
              className={classes.trigger}
              style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
            >
              trigger on left
            </button>
          }
        >
          <strong>Requested:</strong> before → flips after
        </InlineAnchored>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'after' }}
          surfaceClassName={classes.surface}
          trigger={
            <button
              className={classes.trigger}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}
            >
              trigger on right
            </button>
          }
        >
          <strong>Requested:</strong> after → flips before
        </InlineAnchored>
      </div>
    </div>
  </div>
);

FlippingInline.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
