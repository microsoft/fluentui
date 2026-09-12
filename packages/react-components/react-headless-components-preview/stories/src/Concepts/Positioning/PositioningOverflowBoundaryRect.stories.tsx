import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-components';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

type OverflowBoundary = NonNullable<PositioningProps['overflowBoundary']>;

export const OverflowBoundaryRect = (): React.ReactNode => {
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const [boundaryRect, setBoundaryRect] = React.useState<OverflowBoundary | null>(null);

  useIsomorphicLayoutEffect(() => {
    const rect = boundaryRef.current?.getBoundingClientRect();
    if (rect) {
      setBoundaryRect({ width: rect.width, height: rect.height, x: rect.x, y: rect.y });
    }
  }, []);

  return (
    <div className={styles.rectArea}>
      <div ref={boundaryRef} className={styles.rectBoundary} aria-hidden="true" />
      <Popover defaultOpen positioning={{ overflowBoundary: boundaryRect, position: 'below', align: 'start' }}>
        <PopoverTrigger>
          <button className={styles.trigger}>Below start</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>Constrained by a computed rect</PopoverSurface>
      </Popover>
      <Popover defaultOpen positioning={{ overflowBoundary: boundaryRect, position: 'above', align: 'start' }}>
        <PopoverTrigger>
          <button className={styles.trigger}>Above start</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>Constrained by the same rect</PopoverSurface>
      </Popover>
    </div>
  );
};

OverflowBoundaryRect.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story: 'An overflow boundary can be a computed rectangle when no DOM element represents the required bounds.',
    },
  },
};
