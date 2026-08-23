import * as React from 'react';
import { FluentProvider, Switch } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Switch as GriffelSwitch,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  defaultChecked?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  label?: string;
  labelPosition?: 'after' | 'before' | 'above';
  required?: boolean;
  size?: 'medium' | 'small';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical, except for the `required` row: the headless label
 * slot renders no asterisk, which is the one deliberate divergence this component ships.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'unchecked', props: { label: 'Hello' } },
    { label: 'checked', props: { defaultChecked: true, label: 'Hello' } },
    { label: 'small', props: { defaultChecked: true, label: 'Hello', size: 'small' } },
    { label: 'label before', props: { defaultChecked: true, label: 'Hello', labelPosition: 'before' } },
    { label: 'label above', props: { defaultChecked: true, label: 'Hello', labelPosition: 'above' } },
    { label: 'no label', props: { defaultChecked: true } },
    { label: 'disabled', props: { disabled: true, label: 'Hello' } },
    { label: 'disabled checked', props: { defaultChecked: true, disabled: true, label: 'Hello' } },
    { label: 'disabled focusable', props: { disabledFocusable: true, label: 'Hello' } },
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
              <Switch {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSwitch {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
