import * as React from 'react';
import { Badge, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  Badge as GriffelBadge,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'filled' | 'ghost' | 'outline' | 'tint';
  color?: 'brand' | 'danger' | 'important' | 'informative' | 'severe' | 'subtle' | 'success' | 'warning';
  shape?: 'circular' | 'rounded' | 'square';
  size?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'filled brand', props: {} },
    { label: 'ghost danger', props: { appearance: 'ghost', color: 'danger' } },
    { label: 'outline important', props: { appearance: 'outline', color: 'important' } },
    { label: 'tint success', props: { appearance: 'tint', color: 'success' } },
    { label: 'tint warning rounded', props: { appearance: 'tint', color: 'warning', shape: 'rounded' } },
    { label: 'outline severe square', props: { appearance: 'outline', color: 'severe', shape: 'square' } },
    { label: 'tiny', props: { size: 'tiny' } },
    { label: 'extra-small', props: { size: 'extra-small' } },
    { label: 'small rounded', props: { size: 'small', shape: 'rounded' } },
    { label: 'large', props: { size: 'large' } },
    { label: 'extra-large', props: { size: 'extra-large' } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <Badge {...props}>8</Badge>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelBadge {...props}>8</GriffelBadge>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
