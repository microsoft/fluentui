import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';
import type { PositioningProps } from '@fluentui/react-headless-components-preview/positioning';

import styles from './positioning.module.css';

export const OffsetFunction = (): React.ReactNode => {
  const offset: PositioningProps['offset'] = ({ positionedRect }) => ({
    crossAxis: 10,
    mainAxis: positionedRect.width / 2,
  });

  return (
    <div className={styles.column}>
      <p className={styles.fallbackNote}>
        Offset callbacks require element measurements, so this configuration lazily loads the floating-ui fallback.
      </p>
      <Popover positioning={{ position: 'after', offset }}>
        <PopoverTrigger>
          <button className={styles.trigger}>Click me</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>Offset by half of this surface width</PopoverSurface>
      </Popover>
    </div>
  );
};

OffsetFunction.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story:
        'An offset callback receives the positioned and target rectangles plus the current position and alignment. Because it requires runtime measurement, it selects the lazy floating-ui implementation.',
    },
  },
};
