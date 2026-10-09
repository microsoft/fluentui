import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

import styles from './positioning.module.css';

export const EngineOverflowBoundaryPadding = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);
  const [padding, setPadding] = React.useState(8);

  return (
    <PositioningProvider mode="floating-ui">
      <div className={styles.page}>
        <div className={styles.controls}>
          <label className={styles.row}>
            <code>overflowBoundaryPadding</code>
            <input
              type="number"
              className={styles.input}
              value={padding}
              onChange={e => setPadding(parseInt(e.target.value, 10) || 0)}
            />
          </label>
        </div>
        <div ref={setBoundary} className={`${styles.boundary} ${styles.boundaryAlignEnd}`}>
          <Popover
            positioning={{
              overflowBoundary: boundary,
              overflowBoundaryPadding: padding,
              position: 'below',
              align: 'start',
            }}
          >
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock} ${styles.triggerPushed}`}>
                Shorthand padding
              </button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              {padding}px padding from every boundary side
            </PopoverSurface>
          </Popover>

          <Popover
            positioning={{
              overflowBoundary: boundary,
              overflowBoundaryPadding: { end: padding, top: 0, start: 0, bottom: 0 },
              position: 'below',
              align: 'start',
            }}
          >
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock} ${styles.triggerPushed}`}>
                Longhand padding
              </button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              {padding}px padding from the boundary end only
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </PositioningProvider>
  );
};

EngineOverflowBoundaryPadding.parameters = {
  docs: {
    description: {
      story: [
        'The `overflowBoundaryPadding` property sets the padding between the positioned element and the chosen',
        'boundary. The padding can be a shorthand number which applies to all sides, or an object that explicitly',
        'sets the padding for each side. Requires `PositioningProvider` in `floating-ui` or `fallback` mode.',
        '',
        '> _Design guidance recommends using **8px** or **4px** if a padding is required. Custom values are also_',
        '_possible but should stay within a 4px grid._',
      ].join('\n'),
    },
  },
};
