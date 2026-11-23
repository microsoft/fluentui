import * as React from 'react';
import { RangeSlider } from '@fluentui/react-headless-components-preview/range-slider';
import type { RangeSliderValue } from '@fluentui/react-headless-components-preview/range-slider';

import styles from './range-slider.module.css';

export const Default = (): React.ReactNode => {
  const labelId = 'range-slider-default-label';
  const [value, setValue] = React.useState<RangeSliderValue>({ start: 20, end: 80 });

  return (
    <div className={styles.row}>
      <span id={labelId} className={styles.label}>
        Price range
      </span>
      <RangeSlider
        aria-labelledby={labelId}
        min={0}
        max={100}
        value={value}
        onChange={(_, data) => setValue(data.value)}
        className={styles.slider}
        rail={{ className: styles.rail }}
        startThumb={{ className: `${styles.thumb} ${styles.startThumb}` }}
        endThumb={{ className: `${styles.thumb} ${styles.endThumb}` }}
        startInput={{ className: styles.input, 'aria-label': 'Minimum price' }}
        endInput={{ className: styles.input, 'aria-label': 'Maximum price' }}
      />
      <span className={styles.value}>
        ${value.start} – ${value.end}
      </span>
    </div>
  );
};
