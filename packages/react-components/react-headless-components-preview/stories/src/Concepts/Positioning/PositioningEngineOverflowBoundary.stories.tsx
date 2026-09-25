import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningEngineProvider } from '@fluentui/react-headless-components-preview/positioning';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import styles from './positioning.module.css';

export const EngineOverflowBoundary = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <PositioningEngineProvider value={floatingUIPositioningEngine}>
      <div className={styles.page}>
        <div
          ref={setBoundary}
          className={`${styles.boundary} ${styles.boundarySpaceBetween} ${styles.boundaryAlignEnd}`}
        >
          <Popover positioning={{ overflowBoundary: boundary, position: 'below', align: 'start' }}>
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>overflowBoundary</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              Shifted to stay within the overflow boundary
            </PopoverSurface>
          </Popover>

          <Popover positioning={{ position: 'above', align: 'start' }}>
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>no boundary</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              Overflows the dashed box
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </PositioningEngineProvider>
  );
};

EngineOverflowBoundary.parameters = {
  docs: {
    description: {
      story: [
        'The overflow boundary can be configured manually so that the positioned element is shifted to stay within',
        'bounds for different alignments. `overflowBoundary` requires a positioning engine.',
      ].join('\n'),
    },
  },
};
