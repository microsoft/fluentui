import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const FlipBoundary = (): React.ReactNode => {
  const [boundary, setBoundary] = React.useState<HTMLDivElement | null>(null);

  return (
    <div className={styles.column}>
      <p className={styles.fallbackNote}>Custom flip boundaries select the lazy floating-ui fallback.</p>
      <div ref={setBoundary} className={styles.boundary}>
        <Popover defaultOpen positioning={{ flipBoundary: boundary, position: 'above', align: 'start' }}>
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Position: above</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>Stays within the flip boundary</PopoverSurface>
        </Popover>
        <Popover defaultOpen positioning={{ pinned: true, position: 'below', align: 'start' }}>
          <PopoverTrigger>
            <button className={`${styles.trigger} ${styles.boundaryTarget}`}>Pinned below</button>
          </PopoverTrigger>
          <PopoverSurface className={styles.surfaceCallout}>May overflow the boundary</PopoverSurface>
        </Popover>
      </div>
    </div>
  );
};

FlipBoundary.parameters = {
  docs: { description: { story: 'Set `flipBoundary` to control the bounds used when choosing a fallback placement.' } },
};
