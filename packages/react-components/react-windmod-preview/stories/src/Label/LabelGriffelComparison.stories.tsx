import * as React from 'react';
import { Label } from '@fluentui/react-windmod-preview/label';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  FluentProvider as GriffelFluentProvider,
  Label as GriffelLabel,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

const sizes = ['small', 'medium', 'large'] as const;
const weights = ['regular', 'semibold'] as const;

type LookProps = {
  size?: (typeof sizes)[number];
  weight?: (typeof weights)[number];
  disabled?: boolean;
  required?: boolean | string;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    ...sizes.map(size => ({ label: size, props: { size } })),
    ...weights.map(weight => ({ label: weight, props: { weight } })),
    { label: 'large + regular', props: { size: 'large' as const, weight: 'regular' as const } },
    { label: 'required', props: { required: true } },
    { label: 'custom indicator', props: { required: '(required)' } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'disabled required', props: { disabled: true, required: true } },
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
              <Label {...props}>Label</Label>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelLabel {...props}>Label</GriffelLabel>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
