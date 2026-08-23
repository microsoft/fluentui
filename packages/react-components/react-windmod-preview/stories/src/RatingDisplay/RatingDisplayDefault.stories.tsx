import * as React from 'react';
import { FluentProvider, RatingDisplay } from '@fluentui/react-windmod-preview';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';

import styles from '../compare.module.css';

const colors = ['neutral', 'brand', 'marigold'] as const;
const sizes = ['small', 'medium', 'large', 'extra-large'] as const;

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {colors.map(color => (
        <div className={styles.row} key={color}>
          {sizes.map(size => (
            <RatingDisplay key={size} color={color} size={size} value={3.5} count={1160} />
          ))}
        </div>
      ))}
      <div className={styles.row}>
        {[0, 0.5, 1, 2.5, 4, 5].map(value => (
          <RatingDisplay key={value} value={value} />
        ))}
      </div>
      <div className={styles.row}>
        <RatingDisplay compact value={4.5} count={1160} />
        <RatingDisplay max={10} value={7} />
        <RatingDisplay icon={CircleFilled} color="marigold" value={2.5} />
      </div>
    </div>
  </FluentProvider>
);
