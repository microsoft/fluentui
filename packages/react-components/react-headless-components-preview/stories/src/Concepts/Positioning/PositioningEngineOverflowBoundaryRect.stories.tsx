import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { floatingUIPositioningEngine } from '@fluentui/react-positioning';

import styles from './positioning.module.css';

export const EngineOverflowBoundaryRect = (): React.ReactNode => {
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const [boundaryRect, setBoundaryRect] = React.useState<PositioningProps['overflowBoundary']>(null);

  // Measured once after mount; the popovers are closed at that point so no flicker is possible.
  React.useEffect(() => {
    setBoundaryRect(boundaryRef.current?.getBoundingClientRect() ?? null);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.rectArea}>
        <span className={styles.rectAreaLabel}>Container</span>
        <div className={styles.rectBoundary} ref={boundaryRef}>
          <span className={styles.rectBoundaryLabel}>Boundary</span>
        </div>

        <Popover
          positioning={{
            overflowBoundary: boundaryRect,
            position: 'below',
            align: 'start',
            engine: floatingUIPositioningEngine,
          }}
        >
          <PopoverTrigger>
            <button className={styles.trigger}>below-start</button>
          </PopoverTrigger>
          <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
            Stays within the defined rect
          </PopoverSurface>
        </Popover>

        <Popover
          positioning={{
            overflowBoundary: boundaryRect,
            position: 'above',
            align: 'start',
            engine: floatingUIPositioningEngine,
          }}
        >
          <PopoverTrigger>
            <button className={styles.trigger}>above-start</button>
          </PopoverTrigger>
          <PopoverSurface className={`${styles.surfaceFallback} ${styles.flipReadout}`}>
            Stays within the defined rect
          </PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

EngineOverflowBoundaryRect.parameters = {
  docs: {
    description: {
      story: [
        'Boundaries can also be defined as `Rect` objects. This is useful when a boundary is not an actual element,',
        'but some kind of computed values. Requires a positioning engine.',
      ].join('\n'),
    },
  },
};
