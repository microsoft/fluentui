import * as React from 'react';
import { FluentProvider, SpinButton } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  SpinButton as GriffelSpinButton,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
  size?: 'small' | 'medium';
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: number | null;
  value?: number | null;
  displayValue?: string;
  min?: number;
  max?: number;
  'aria-invalid'?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const noop = () => undefined;
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'outline', props: { defaultValue: 5 } },
    { label: 'underline', props: { appearance: 'underline', defaultValue: 5 } },
    { label: 'filled-darker', props: { appearance: 'filled-darker', defaultValue: 5 } },
    { label: 'filled-lighter', props: { appearance: 'filled-lighter', defaultValue: 5 } },
    { label: 'small', props: { size: 'small', defaultValue: 5 } },
    { label: 'small filled-darker', props: { size: 'small', appearance: 'filled-darker', defaultValue: 5 } },
    { label: 'placeholder', props: { defaultValue: null, placeholder: 'Placeholder' } },
    { label: 'invalid', props: { 'aria-invalid': true, defaultValue: 5 } },
    { label: 'invalid underline', props: { appearance: 'underline', 'aria-invalid': true, defaultValue: 5 } },
    { label: 'disabled', props: { disabled: true, defaultValue: 5 } },
    { label: 'disabled filled-darker', props: { appearance: 'filled-darker', disabled: true, defaultValue: 5 } },
    { label: 'read-only', props: { readOnly: true, defaultValue: 5 } },
    { label: 'at max bound', props: { value: 10, min: 0, max: 10 } },
    { label: 'at both bounds', props: { value: 3, min: 3, max: 3 } },
    { label: 'display value', props: { value: 1, displayValue: '$1.00' } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props }) => {
        const controlled = props.value !== undefined ? { onChange: noop } : {};

        return (
          <React.Fragment key={label}>
            <div className={styles.label}>{label}</div>
            <div>
              <FluentProvider>
                <SpinButton {...props} {...controlled} />
              </FluentProvider>
            </div>
            <div>
              <GriffelFluentProvider theme={webLightTheme}>
                <GriffelSpinButton {...props} {...controlled} />
              </GriffelFluentProvider>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
