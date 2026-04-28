import * as React from 'react';
import { Rating, RatingItem } from '@fluentui/react-headless-components-preview/rating';
import { StarFilled, StarRegular } from '@fluentui/react-icons';

import styles from '../../../../../../theme/components/rating.module.css';
import storySource from './RatingDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState(3);
  const max = 5;

  return (
    <div className={styles.row}>
      <Rating max={max} value={value} onChange={(_, data) => setValue(data.value)} className={styles.rating}>
        {Array.from({ length: max }, (_, i) => (
          <RatingItem
            key={i}
            value={i + 1}
            className={styles.item}
            selectedIcon={<StarFilled className={styles.icon} />}
            unselectedIcon={<StarRegular className={styles.icon} />}
            fullValueInput={{ className: styles.input }}
          />
        ))}
      </Rating>
      <span className={styles.value}>
        {value} / {max}
      </span>
    </div>
  );
};

Default.parameters = withStorySource(storySource);
