import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import { PositioningProvider } from '@fluentui/react-headless-components-preview/positioning-floating-ui';

import styles from './positioning.module.css';

export const EngineFlipBoundary = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <PositioningProvider mode="floating-ui">
      <div className={styles.page}>
        <div ref={setBoundary} className={`${styles.boundary} ${styles.boundarySpaceBetween}`}>
          <Popover positioning={{ flipBoundary: boundary, position: 'above', align: 'start' }}>
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>Position: above</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              Stays within the flip boundary
            </PopoverSurface>
          </Popover>

          <Popover positioning={{ position: 'below', align: 'start' }}>
            <PopoverTrigger>
              <button className={`${styles.trigger} ${styles.triggerBlock}`}>Position: below</button>
            </PopoverTrigger>
            <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
              Overflows the flip boundary
            </PopoverSurface>
          </Popover>
        </div>
      </div>
    </PositioningProvider>
  );
};

EngineFlipBoundary.parameters = {
  docs: {
    description: {
      story: [
        'The flip boundary can be configured manually so that the positioned element stays within bounds for',
        'different positions. `flipBoundary` has no CSS anchor positioning equivalent (`position-try-fallbacks` always',
        'flips against the containing block), so it requires `PositioningProvider` in `floating-ui` or `fallback` mode — here supplied app-wide through',
        '`<PositioningProvider mode="floating-ui">`.',
      ].join('\n'),
    },
  },
};
