import * as React from 'react';
import { Slider } from '@fluentui/react-headless-components-preview/slider';

import styles from './slider.module.css';
import storySource from './SliderDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState(42);
  return (
    <div className={`${styles.row} ${styles.demo}`}>
      <Slider
        id="custom-slider"
        min={0}
        max={100}
        value={value}
        onChange={(_, data) => setValue(data.value)}
        className={styles.slider}
        input={{ className: styles.input }}
        rail={{ className: styles.rail }}
        thumb={{ className: styles.thumb }}
      />
      <span className={styles.value}>{value}</span>
    </div>
  );
};

Default.parameters = withStorySource(storySource);
