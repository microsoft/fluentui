import * as React from 'react';
import { FluentProvider, ProgressBar } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  ProgressBar as GriffelProgressBar,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  color?: 'brand' | 'success' | 'warning' | 'error';
  max?: number;
  shape?: 'rounded' | 'square';
  thickness?: 'medium' | 'large';
  value?: number;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'indeterminate', props: {} },
    { label: 'value 0', props: { value: 0 } },
    { label: 'value 0.5', props: { value: 0.5 } },
    { label: 'value 1', props: { value: 1 } },
    { label: 'value 42 of 100', props: { value: 42, max: 100 } },
    { label: 'square', props: { value: 0.5, shape: 'square' } },
    { label: 'large', props: { value: 0.5, thickness: 'large' } },
    { label: 'square large', props: { value: 0.5, shape: 'square', thickness: 'large' } },
    { label: 'success', props: { value: 0.6, color: 'success' } },
    { label: 'warning', props: { value: 0.6, color: 'warning' } },
    { label: 'error', props: { value: 0.6, color: 'error' } },
    { label: 'indeterminate large', props: { thickness: 'large' } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div style={{ width: 200 }}>
            <FluentProvider>
              <ProgressBar {...props} />
            </FluentProvider>
          </div>
          <div style={{ width: 200 }}>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelProgressBar {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
