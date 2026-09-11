import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { RatingDisplay } from '@fluentui/react-windmod-preview/rating-display';
import {
  FluentProvider as GriffelFluentProvider,
  RatingDisplay as GriffelRatingDisplay,
  webLightTheme,
} from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons/headless/svg/circle';
import { CircleFilled as GriffelCircleFilled } from '@fluentui/react-icons';

import styles from '../compare.module.css';

type LookProps = {
  color?: 'brand' | 'marigold' | 'neutral';
  compact?: boolean;
  count?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  value?: number;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; icon?: boolean }> = [
    { label: 'default', props: {} },
    { label: 'value 3.5', props: { value: 3.5 } },
    { label: 'value 0', props: { value: 0 } },
    { label: 'value 5', props: { value: 5 } },
    { label: 'brand', props: { color: 'brand', value: 3.5 } },
    { label: 'marigold', props: { color: 'marigold', value: 3.5 } },
    { label: 'small', props: { size: 'small', value: 3.5, count: 1160 } },
    { label: 'large', props: { size: 'large', value: 3.5, count: 1160 } },
    { label: 'extra-large', props: { size: 'extra-large', value: 3.5, count: 1160 } },
    { label: 'compact', props: { compact: true, value: 4.5, count: 1160 } },
    { label: 'max 10', props: { max: 10, value: 7 } },
    { label: 'count only', props: { count: 1234567 } },
    { label: 'custom icon', props: { color: 'marigold', value: 2.5 }, icon: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, icon }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <RatingDisplay {...props} icon={icon ? CircleFilled : undefined} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelRatingDisplay {...props} icon={icon ? GriffelCircleFilled : undefined} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
