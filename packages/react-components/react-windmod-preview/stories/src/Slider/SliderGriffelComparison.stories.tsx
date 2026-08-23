import * as React from 'react';
import { FluentProvider, Slider } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Slider as GriffelSlider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  size?: 'small' | 'medium';
  disabled?: boolean;
  vertical?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  root?: { style?: React.CSSProperties };
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'medium', props: { value: 50 } },
    { label: 'small', props: { size: 'small', value: 50 } },
    { label: 'value 0', props: { value: 0 } },
    { label: 'value 100', props: { value: 100 } },
    { label: 'step 10', props: { step: 10, value: 40 } },
    { label: 'step 25', props: { step: 25, value: 50 } },
    { label: 'min/max remap', props: { max: 50, min: -50, value: -25 } },
    { label: 'disabled', props: { disabled: true, value: 50 } },
    { label: 'disabled + step', props: { disabled: true, step: 20, value: 40 } },
    { label: 'vertical', props: { value: 50, vertical: true } },
    { label: 'vertical small', props: { size: 'small', value: 50, vertical: true } },
    { label: 'vertical disabled + step', props: { disabled: true, step: 20, value: 40, vertical: true } },
    { label: 'fixed-width root', props: { root: { style: { width: 240 } }, value: 50 } },
    { label: 'fixed-height vertical root', props: { root: { style: { height: 200 } }, value: 50, vertical: true } },
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
              <Slider {...props} />
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelSlider {...props} />
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
