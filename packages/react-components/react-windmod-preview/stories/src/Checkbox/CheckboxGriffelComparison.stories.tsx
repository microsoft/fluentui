import * as React from 'react';
import { Checkbox, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  Checkbox as GriffelCheckbox,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  checked?: 'mixed' | boolean;
  disabled?: boolean;
  label?: string;
  labelPosition?: 'before' | 'after';
  required?: boolean;
  shape?: 'square' | 'circular';
  size?: 'medium' | 'large';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical, except for the `required` row: the headless label
 * slot renders no asterisk, which is the one deliberate divergence this component ships.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'unchecked', props: { label: 'Hello' } },
    { label: 'checked', props: { checked: true, label: 'Hello' } },
    { label: 'mixed', props: { checked: 'mixed', label: 'Hello' } },
    { label: 'large', props: { checked: true, label: 'Hello', size: 'large' } },
    { label: 'circular checked', props: { checked: true, label: 'Hello', shape: 'circular' } },
    { label: 'circular mixed', props: { checked: 'mixed', label: 'Hello', shape: 'circular' } },
    { label: 'label before', props: { checked: true, label: 'Hello', labelPosition: 'before' } },
    { label: 'no label', props: { checked: true } },
    { label: 'disabled', props: { disabled: true, label: 'Hello' } },
    { label: 'disabled checked', props: { checked: true, disabled: true, label: 'Hello' } },
    { label: 'disabled mixed', props: { checked: 'mixed', disabled: true, label: 'Hello' } },
    { label: 'required (asterisk gap)', props: { label: 'Hello', required: true } },
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
              <Checkbox {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelCheckbox {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
