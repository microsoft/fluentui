import * as React from 'react';
import { Field, FluentProvider, Input } from '@fluentui/react-windmod-preview';
import {
  Field as GriffelField,
  FluentProvider as GriffelFluentProvider,
  Input as GriffelInput,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  hint?: string;
  label?: string;
  orientation?: 'vertical' | 'horizontal';
  required?: boolean;
  size?: 'small' | 'medium' | 'large';
  validationMessage?: string;
  validationState?: 'error' | 'warning' | 'success' | 'none';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical. Every cell holds a real control at the default
 * size: a windmod control takes its size from its own prop, where a Griffel control also reads
 * the field context, so only `size="medium"` puts the same control box on both sides.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'vertical', props: { label: 'Label' } },
    { label: 'horizontal', props: { label: 'Label', orientation: 'horizontal' } },
    { label: 'required', props: { label: 'Label', required: true } },
    { label: 'error', props: { label: 'Label', validationMessage: 'Validation message' } },
    {
      label: 'warning',
      props: { label: 'Label', validationMessage: 'Validation message', validationState: 'warning' },
    },
    {
      label: 'success',
      props: { label: 'Label', validationMessage: 'Validation message', validationState: 'success' },
    },
    { label: 'none', props: { label: 'Label', validationMessage: 'Validation message', validationState: 'none' } },
    { label: 'hint', props: { hint: 'Hint text', label: 'Label' } },
    {
      label: 'everything',
      props: { hint: 'Hint text', label: 'Label', required: true, validationMessage: 'Validation message' },
    },
    { label: 'horizontal, no label', props: { orientation: 'horizontal', validationMessage: 'Validation message' } },
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
              <Field {...props}>
                <Input />
              </Field>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelField {...props}>
                <GriffelInput />
              </GriffelField>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
