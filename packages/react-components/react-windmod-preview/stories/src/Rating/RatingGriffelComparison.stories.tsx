import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Rating } from '@fluentui/react-windmod-preview/rating';
import {
  FluentProvider as GriffelFluentProvider,
  Rating as GriffelRating,
  webLightTheme,
} from '@fluentui/react-components';
import { CircleFilled, CircleRegular } from '@fluentui/react-icons/headless/svg/circle';
import { CircleFilled as GriffelCircleFilled, CircleRegular as GriffelCircleRegular } from '@fluentui/react-icons';

import styles from '../compare.module.css';

type LookProps = {
  color?: 'brand' | 'marigold' | 'neutral';
  defaultValue?: number;
  max?: number;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  step?: 0.5 | 1;
  value?: number;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; icon?: boolean }> = [
    { label: 'default', props: {} },
    { label: 'value 3', props: { value: 3 } },
    { label: 'value 5', props: { value: 5 } },
    { label: 'brand', props: { color: 'brand', value: 3 } },
    { label: 'marigold', props: { color: 'marigold', value: 3 } },
    { label: 'small', props: { size: 'small', value: 3 } },
    { label: 'medium', props: { size: 'medium', value: 3 } },
    { label: 'large', props: { size: 'large', value: 3 } },
    { label: 'half step', props: { step: 0.5, value: 2.5 } },
    { label: 'max 10', props: { max: 10, value: 7 } },
    { label: 'uncontrolled', props: { defaultValue: 2 } },
    { label: 'custom icon', props: { color: 'marigold', value: 2.5, step: 0.5 }, icon: true },
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
              <Rating
                {...props}
                iconFilled={icon ? CircleFilled : undefined}
                iconOutline={icon ? CircleRegular : undefined}
              />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelRating
                {...props}
                iconFilled={icon ? GriffelCircleFilled : undefined}
                iconOutline={icon ? GriffelCircleRegular : undefined}
              />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
