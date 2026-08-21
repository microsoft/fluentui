import * as React from 'react';
import { Label, ThemeProvider } from '@fluentui/react-windmod-preview';
import { FluentProvider, Label as GriffelLabel, webLightTheme } from '@fluentui/react-components';

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
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
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
            <ThemeProvider>
              <Label {...props}>Label</Label>
            </ThemeProvider>
          </div>
          <div>
            <FluentProvider theme={webLightTheme}>
              <GriffelLabel {...props}>Label</GriffelLabel>
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
