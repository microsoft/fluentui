import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import descriptionMd from './PositioningAutoSizeDescription.md';
import styles from './positioning.module.css';

const items = Array.from({ length: 40 }, (_, index) => `Item ${index + 1}`);

export const AutoSize = (): React.ReactNode => (
  <div className={styles.column}>
    <Popover positioning={{ position: 'below', autoSize: true }}>
      <PopoverTrigger>
        <button className={styles.trigger}>Click me</button>
      </PopoverTrigger>
      <PopoverSurface className={styles.surfaceAutoSize}>
        {items.map(item => (
          <div key={item} className={styles.autoSizeItem}>
            {item}
          </div>
        ))}
      </PopoverSurface>
    </Popover>
  </div>
);

AutoSize.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
