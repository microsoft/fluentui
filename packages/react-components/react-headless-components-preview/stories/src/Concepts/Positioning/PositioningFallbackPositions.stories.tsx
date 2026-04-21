import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview';
import { demoBoxClass, demoBoxStyle, flipDemoSurfaceCss } from './demoBox';

const classes = {
  page: 'flex flex-col gap-6 p-4',
  sectionTitle: 'text-sm font-semibold text-gray-800 mb-1',
  sectionNote: 'text-xs text-gray-500 max-w-xl mb-2',
  grid: 'grid grid-cols-1 sm:grid-cols-2 gap-4',
  trigger:
    'px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 data-[open]:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 cursor-pointer border-none',
  surface: 'flip-demo bg-white rounded-md shadow-md border border-gray-200 p-3 min-w-[200px] max-w-xs text-sm',
};

export const FallbackPositions = (): React.ReactNode => (
  <div className={classes.page}>
    <style>{flipDemoSurfaceCss}</style>

    <section>
      <h3 className={classes.sectionTitle}>Basic fallback</h3>
      <p className={classes.sectionNote}>
        Primary <code>above</code> overflows the box → first fallback <code>below-start</code> fits → surface renders
        there.
      </p>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover
          inline
          defaultOpen
          positioning={{
            position: 'above',
            align: 'center',
            fallbackPositions: ['below-start', 'after'],
          }}
        >
          <PopoverTrigger>
            <button
              className={classes.trigger}
              style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}
            >
              trigger near top
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> above · fallbacks: <code>below-start</code>, <code>after</code>
          </PopoverSurface>
        </Popover>
      </div>
    </section>

    <section>
      <h3 className={classes.sectionTitle}>Chain walking</h3>
      <p className={classes.sectionNote}>
        Trigger pinned to top-left. Primary <code>above</code> overflows, first fallback <code>before</code> also
        overflows (no room to the left), so the browser falls through to <code>below</code>. The live{' '}
        <strong>Actual</strong> readout should read <code>below</code>.
      </p>
      <div className={demoBoxClass} style={demoBoxStyle}>
        <Popover
          inline
          defaultOpen
          positioning={{
            position: 'above',
            align: 'center',
            fallbackPositions: ['before', 'below'],
          }}
        >
          <PopoverTrigger>
            <button className={classes.trigger} style={{ position: 'absolute', top: 12, left: 12 }}>
              top-left trigger
            </button>
          </PopoverTrigger>
          <PopoverSurface className={classes.surface}>
            <strong>Requested:</strong> above · fallbacks: <code>before</code>, <code>below</code>
          </PopoverSurface>
        </Popover>
      </div>
    </section>

    <section>
      <h3 className={classes.sectionTitle}>Custom chain replaces default flip</h3>
      <p className={classes.sectionNote}>
        Same overflow condition, different chains. Left popover has no <code>fallbackPositions</code> → default{' '}
        <code>flip-block, flip-inline</code> fires → surface ends up below. Right popover passes <code>['after']</code>{' '}
        → custom chain replaces defaults → surface goes to the right instead of flipping.
      </p>
      <div className={classes.grid}>
        <div className={demoBoxClass} style={demoBoxStyle}>
          <Popover inline defaultOpen positioning={{ position: 'above', align: 'center' }}>
            <PopoverTrigger>
              <button
                className={classes.trigger}
                style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}
              >
                default (flip)
              </button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              <strong>Requested:</strong> above · no custom fallbacks
            </PopoverSurface>
          </Popover>
        </div>
        <div className={demoBoxClass} style={demoBoxStyle}>
          <Popover
            inline
            defaultOpen
            positioning={{
              position: 'above',
              align: 'center',
              fallbackPositions: ['after', 'below'],
            }}
          >
            <PopoverTrigger>
              <button
                className={classes.trigger}
                style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)' }}
              >
                custom ({`['after']`})
              </button>
            </PopoverTrigger>
            <PopoverSurface className={classes.surface}>
              <strong>Requested:</strong> above · fallbacks: <code>after</code>, <code>below</code>
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </section>
  </div>
);
