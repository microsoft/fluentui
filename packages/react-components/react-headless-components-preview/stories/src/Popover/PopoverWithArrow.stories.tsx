import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import styles from './popover.module.css';

export const WithArrow = (): React.ReactNode => (
  <div className={styles.columnSpacious}>
    <Popover withArrow positioning={{ position: 'below', offset: 10 }}>
      <PopoverTrigger>
        <button className={styles.trigger}>Center-aligned</button>
      </PopoverTrigger>
      <PopoverSurface className={`${styles.surface} ${styles.surfaceWithArrow}`}>
        <h3 className={styles.heading}>Arrow popover</h3>
        <p className={styles.body}>
          Arrow orientation follows the <code>data-placement</code> attribute, which <code>usePositioning</code> keeps
          in sync with the actual placement as you scroll or resize.
        </p>
      </PopoverSurface>
    </Popover>

    <Popover withArrow positioning={{ position: 'below', align: 'start', offset: 10 }}>
      <PopoverTrigger>
        <button className={styles.trigger}>Start-aligned (--arrow-padding: 16px)</button>
      </PopoverTrigger>
      <PopoverSurface
        className={`${styles.surface} ${styles.surfaceWithArrow}`}
        style={{ '--arrow-padding': '16px' } as React.CSSProperties}
      >
        <h3 className={styles.heading}>Arrow padded from corner</h3>
        <p className={styles.body}>
          Arrow positioning is fully CSS-owned. For start/end alignments, the rule reads{' '}
          <code>var(--arrow-padding, 12px)</code>; this surface overrides the fallback by setting{' '}
          <code>--arrow-padding: 16px</code> in its inline <code>style</code>.
        </p>
      </PopoverSurface>
    </Popover>
  </div>
);
