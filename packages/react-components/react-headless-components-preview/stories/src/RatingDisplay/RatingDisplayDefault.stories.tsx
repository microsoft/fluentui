import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-headless-components-preview/rating-display';
import { StarFilled, StarHalfFilled, StarRegular } from '@fluentui/react-icons';

import styles from './rating-display.module.css';
import storySource from './RatingDisplayDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
const RatingIcon = (): React.ReactNode => (
  <>
    <StarFilled className={`${styles.icon} ${styles.iconFilled}`} />
    <StarHalfFilled className={`${styles.icon} ${styles.iconHalf}`} />
    <StarRegular className={`${styles.icon} ${styles.iconOutline}`} />
  </>
);

export const Default = (): React.ReactNode => (
  <RatingDisplay
    icon={RatingIcon}
    className={styles.display}
    value={2.5}
    max={5}
    valueText={{ className: styles.value }}
    countText={{ className: styles.count, children: '(248)' }}
  />
);

Default.parameters = withStorySource(storySource);
