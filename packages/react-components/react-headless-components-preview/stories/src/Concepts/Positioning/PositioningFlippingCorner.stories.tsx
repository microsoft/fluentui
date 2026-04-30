import * as React from 'react';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';
import { InlineAnchored } from './InlineAnchored';

import descriptionMd from './PositioningFlippingCornerDescription.md';

const classes = {
  page: 'flex flex-col gap-4 p-4',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'flip-demo bg-white rounded-md shadow-md border border-gray-200 p-3 w-[320px] max-h-[140px] text-sm',
};

export const FlippingCorner = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <div className={classes.grid}>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'above', align: 'end' }}
          surfaceClassName={classes.surface}
          trigger={
            <button className={classes.trigger} style={{ position: 'absolute', top: 12, left: 12 }}>
              top-left · requested above-end
            </button>
          }
        >
          <strong>Requested:</strong> above-end → below-start
        </InlineAnchored>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'above', align: 'start' }}
          surfaceClassName={classes.surface}
          trigger={
            <button className={classes.trigger} style={{ position: 'absolute', top: 12, right: 12 }}>
              top-right · requested above-start
            </button>
          }
        >
          <strong>Requested:</strong> above-start → below-end
        </InlineAnchored>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'below', align: 'end' }}
          surfaceClassName={classes.surface}
          trigger={
            <button className={classes.trigger} style={{ position: 'absolute', bottom: 12, left: 12 }}>
              bottom-left · requested below-end
            </button>
          }
        >
          <strong>Requested:</strong> below-end → above-start
        </InlineAnchored>
      </div>

      <div className={demoBoxClass} style={demoBoxStyle}>
        <InlineAnchored
          positioning={{ position: 'below', align: 'start' }}
          surfaceClassName={classes.surface}
          trigger={
            <button className={classes.trigger} style={{ position: 'absolute', bottom: 12, right: 12 }}>
              bottom-right · requested below-start
            </button>
          }
        >
          <strong>Requested:</strong> below-start → above-end
        </InlineAnchored>
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
