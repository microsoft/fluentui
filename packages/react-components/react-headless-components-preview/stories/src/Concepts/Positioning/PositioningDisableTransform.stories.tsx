import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const DisableTransform = (): React.ReactNode => (
  <div className={styles.column}>
    <p className={styles.fallbackNote}>
      CSS Anchor Positioning does not need transforms. Setting <code>useTransform: false</code> keeps the native path.
    </p>
    <Popover positioning={{ useTransform: false }}>
      <PopoverTrigger>
        <button className={styles.trigger}>Click me</button>
      </PopoverTrigger>
      <PopoverSurface className={styles.surfaceCallout}>Positioned without a transform</PopoverSurface>
    </Popover>
  </div>
);

DisableTransform.parameters = {
  docs: {
    description: {
      story:
        'Disable transform-based coordinates with `useTransform: false`. Native CSS Anchor Positioning already positions without transforms; the option also controls the floating-ui fallback when another feature selects it.',
    },
  },
};
