import * as React from 'react';
import { Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-headless-components-preview/popover';

import styles from './positioning.module.css';

export const AnchorToTarget = (): React.ReactNode => {
  const [target, setTarget] = React.useState<HTMLElement | null>(null);

  return (
    <div className={styles.toolbar}>
      <Popover positioning={{ position: 'above', align: 'start', target }}>
        <PopoverTrigger>
          <button className={styles.trigger}>Open popover</button>
        </PopoverTrigger>
        <PopoverSurface className={styles.surfaceCallout}>Anchored to the other button</PopoverSurface>
      </Popover>
      <button ref={setTarget} className={styles.triggerSm}>
        Positioning target
      </button>
    </div>
  );
};

AnchorToTarget.parameters = {
  layout: 'padded',
  docs: {
    description: {
      story:
        'Use `target` to anchor a positioned surface to a DOM element other than its trigger. CSS Anchor Positioning remains the default for an HTML target.',
    },
  },
};
