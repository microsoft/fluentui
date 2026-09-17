import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const OverflowBoundary = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className={styles.column}>
      <p className={styles.fallbackNote}>Custom overflow boundaries select the lazy floating-ui fallback.</p>
      <div ref={setBoundary} className={styles.boundary}>
        <Popover defaultOpen positioning={{ overflowBoundary: boundary, position: 'below', align: 'start' }}>
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Constrained</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>Stays within the overflow boundary</PopoverSurface>
        </Popover>
        <Popover defaultOpen positioning={{ pinned: true, position: 'above', align: 'start' }}>
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Unconstrained</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>May overflow the boundary</PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

OverflowBoundary.parameters = {
  docs: {
    description: { story: 'Set `overflowBoundary` to constrain shifting of a positioned surface to custom bounds.' },
  },
};
