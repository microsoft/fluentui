import * as React from 'react';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-headless-components-preview/popover';

import descriptionMd from './PositioningMatchTargetSizeDescription.md';
import styles from './positioning.module.css';

export const MatchTargetSize = (): React.ReactNode => (
  <div className={styles.column}>
    <Popover defaultOpen positioning={{ matchTargetSize: 'width' }}>
      <PopoverTrigger>
        <button className={`${styles.trigger} ${styles.triggerWide}`}>Click me</button>
      </PopoverTrigger>
      <PopoverSurface className={styles.surfaceMatch}>
        This popover has the same width as its target anchor
      </PopoverSurface>
    </Popover>
  </div>
);

MatchTargetSize.parameters = {
  docs: {
    description: {
      story: descriptionMd,
    },
  },
};
