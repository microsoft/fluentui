import * as React from 'react';
import { FluentProvider, Textarea } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Textarea as GriffelTextarea,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'outline' | 'filled-darker' | 'filled-lighter';
  size?: 'small' | 'medium' | 'large';
  resize?: 'none' | 'horizontal' | 'vertical' | 'both';
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  'aria-invalid'?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'outline', props: { defaultValue: 'Text' } },
    { label: 'filled-darker', props: { appearance: 'filled-darker', defaultValue: 'Text' } },
    { label: 'filled-lighter', props: { appearance: 'filled-lighter', defaultValue: 'Text' } },
    { label: 'small', props: { defaultValue: 'Text', size: 'small' } },
    { label: 'large', props: { defaultValue: 'Text', size: 'large' } },
    { label: 'placeholder', props: { placeholder: 'Placeholder' } },
    { label: 'resize both', props: { defaultValue: 'Text', resize: 'both' } },
    { label: 'resize vertical', props: { defaultValue: 'Text', resize: 'vertical' } },
    { label: 'resize horizontal', props: { defaultValue: 'Text', resize: 'horizontal' } },
    { label: 'invalid', props: { 'aria-invalid': true, defaultValue: 'Text' } },
    {
      label: 'invalid filled-darker',
      props: { appearance: 'filled-darker', 'aria-invalid': true, defaultValue: 'Text' },
    },
    { label: 'disabled', props: { defaultValue: 'Text', disabled: true } },
    { label: 'disabled filled-darker', props: { appearance: 'filled-darker', disabled: true, placeholder: 'Ph' } },
    { label: 'disabled resize both', props: { defaultValue: 'Text', disabled: true, resize: 'both' } },
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
              <Textarea {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelTextarea {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
