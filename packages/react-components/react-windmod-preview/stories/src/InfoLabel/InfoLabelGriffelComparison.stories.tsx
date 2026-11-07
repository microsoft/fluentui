import * as React from 'react';
import { Field } from '@fluentui/react-windmod-preview/field';
import { InfoLabel } from '@fluentui/react-windmod-preview/info-label';
import { Input } from '@fluentui/react-windmod-preview/input';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import type { LabelProps } from '@fluentui/react-windmod-preview/label';
import {
  Field as GriffelField,
  FluentProvider as GriffelFluentProvider,
  InfoLabel as GriffelInfoLabel,
  Input as GriffelInput,
  webLightTheme,
} from '@fluentui/react-components';
import type { LabelProps as GriffelLabelProps } from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  size?: 'small' | 'medium' | 'large';
  weight?: 'regular' | 'semibold';
  required?: boolean;
  disabled?: boolean;
  info?: string;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider). The
 * pair in each row must be pixel-identical. The last row is the Field composition, where the
 * label slot's render function replaces the whole slot on both sides.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'small', props: { size: 'small', info: 'Example info' } },
    { label: 'medium', props: { info: 'Example info' } },
    { label: 'large', props: { size: 'large', info: 'Example info' } },
    { label: 'required', props: { required: true, info: 'Example info' } },
    { label: 'disabled', props: { disabled: true, info: 'Example info' } },
    { label: 'disabled required', props: { disabled: true, required: true, info: 'Example info' } },
    { label: 'semibold', props: { weight: 'semibold', info: 'Example info' } },
    { label: 'no info', props: {} },
  ];

  return (
    <div className={styles.grid}>
      <span className={styles.header}>variant</span>
      <span className={styles.header}>windmod</span>
      <span className={styles.header}>griffel</span>

      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <span className={styles.label}>{label}</span>
          <FluentProvider>
            <InfoLabel {...props}>Label</InfoLabel>
          </FluentProvider>
          <GriffelFluentProvider theme={webLightTheme}>
            <GriffelInfoLabel {...props}>Label</GriffelInfoLabel>
          </GriffelFluentProvider>
        </React.Fragment>
      ))}

      <span className={styles.label}>in a large Field</span>
      <FluentProvider>
        <Field
          size="large"
          label={{
            children: (_first: unknown, labelProps: LabelProps) => (
              <InfoLabel {...labelProps} info="Example info">
                Field with info label
              </InfoLabel>
            ),
          }}
        >
          <Input />
        </Field>
      </FluentProvider>
      <GriffelFluentProvider theme={webLightTheme}>
        <GriffelField
          size="large"
          label={{
            children: (_first: unknown, labelProps: GriffelLabelProps) => (
              <GriffelInfoLabel {...labelProps} info="Example info">
                Field with info label
              </GriffelInfoLabel>
            ),
          }}
        >
          <GriffelInput />
        </GriffelField>
      </GriffelFluentProvider>
    </div>
  );
};
