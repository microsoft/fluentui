import * as React from 'react';
import { RatingDisplay } from '@fluentui/react-headless-components-preview/rating-display';
import { StarFilled, StarHalfFilled, StarRegular } from '@fluentui/react-icons';

import styles from './rating-display.module.css';
import storySource from './RatingDisplayCompact.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
const RatingIcon: React.FC = () => (
  <>
    <StarFilled className={`${styles.icon} ${styles.iconFilled}`} />
    <StarHalfFilled className={`${styles.icon} ${styles.iconHalf}`} />
    <StarRegular className={`${styles.icon} ${styles.iconOutline}`} />
  </>
);

export const Compact = (): React.ReactNode => (
  <RatingDisplay
    className={styles.display}
    compact
    value={3}
    icon={RatingIcon}
    valueText={{ className: styles.value }}
  />
);

Compact.parameters = withStorySource(storySource);
