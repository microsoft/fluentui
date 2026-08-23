import * as React from 'react';
import { FluentProvider, Spinner } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Spinner as GriffelSpinner,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'primary' | 'inverted';
  size?: 'extra-tiny' | 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
  label?: string;
  labelPosition?: 'above' | 'below' | 'before' | 'after';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'medium primary', props: {} },
    { label: 'extra-tiny', props: { size: 'extra-tiny' } },
    { label: 'tiny', props: { size: 'tiny' } },
    { label: 'extra-small', props: { size: 'extra-small' } },
    { label: 'small', props: { size: 'small' } },
    { label: 'large', props: { size: 'large' } },
    { label: 'extra-large', props: { size: 'extra-large' } },
    { label: 'huge', props: { size: 'huge' } },
    { label: 'label after', props: { label: 'Loading' } },
    { label: 'label before', props: { label: 'Loading', labelPosition: 'before' } },
    { label: 'label above', props: { label: 'Loading', labelPosition: 'above' } },
    { label: 'label below', props: { label: 'Loading', labelPosition: 'below' } },
    { label: 'huge with label', props: { size: 'huge', label: 'Loading' } },
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
              <Spinner {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSpinner {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
