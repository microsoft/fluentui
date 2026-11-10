import * as React from 'react';
import { RangeSlider } from '@fluentui/react-headless-components-preview/range-slider';

import styles from './range-slider.module.css';

export const DisabledThumb = (): React.ReactNode => {
  const labelId = 'range-slider-disabled-thumb-label';

  return (
    <div className={styles.row}>
      <span id={labelId} className={styles.label}>
        Price range, at least $20
      </span>
      <RangeSlider
        aria-labelledby={labelId}
        defaultValue={{ start: 20, end: 60 }}
        className={styles.slider}
        rail={{ className: styles.rail }}
        startThumb={{ className: `${styles.thumb} ${styles.startThumb}` }}
        endThumb={{ className: `${styles.thumb} ${styles.endThumb}` }}
        startInput={{ className: styles.input, 'aria-label': 'Minimum price', disabled: true }}
        endInput={{ className: styles.input, 'aria-label': 'Maximum price' }}
      />
    </div>
  );
};

DisabledThumb.parameters = {
  docs: {
    description: {
      story:
        'Set `disabled` on a single input slot to lock that thumb. It stays focusable and announces its value, and its thumb gets `data-disabled`; pressing the rail moves the other thumb, which stops at the disabled one.',
    },
  },
};
