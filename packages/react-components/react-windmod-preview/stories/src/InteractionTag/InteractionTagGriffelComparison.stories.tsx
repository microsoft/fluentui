import * as React from 'react';
import {
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagSecondary,
} from '@fluentui/react-windmod-preview/interaction-tag';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  FluentProvider as GriffelFluentProvider,
  InteractionTag as GriffelInteractionTag,
  InteractionTagPrimary as GriffelInteractionTagPrimary,
  InteractionTagSecondary as GriffelInteractionTagSecondary,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'filled' | 'outline' | 'brand';
  shape?: 'rounded' | 'circular';
  size?: 'medium' | 'small' | 'extra-small';
  disabled?: boolean;
  selected?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; secondary?: boolean }> = [
    { label: 'filled medium', props: {} },
    { label: 'small', props: { size: 'small' } },
    { label: 'extra-small', props: { size: 'extra-small' } },
    { label: 'outline', props: { appearance: 'outline' } },
    { label: 'brand', props: { appearance: 'brand' } },
    { label: 'circular', props: { shape: 'circular' } },
    { label: 'with secondary', props: {}, secondary: true },
    { label: 'circular with secondary', props: { shape: 'circular' }, secondary: true },
    { label: 'brand small with secondary', props: { appearance: 'brand', size: 'small' }, secondary: true },
    { label: 'selected', props: { selected: true }, secondary: true },
    { label: 'disabled', props: { disabled: true }, secondary: true },
    { label: 'disabled selected', props: { disabled: true, selected: true }, secondary: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, secondary }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div>
            <FluentProvider>
              <InteractionTag {...props}>
                <InteractionTagPrimary hasSecondaryAction={secondary}>Primary</InteractionTagPrimary>
                {secondary && <InteractionTagSecondary aria-label="dismiss" />}
              </InteractionTag>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelInteractionTag {...props}>
                <GriffelInteractionTagPrimary hasSecondaryAction={secondary}>Primary</GriffelInteractionTagPrimary>
                {secondary && <GriffelInteractionTagSecondary aria-label="dismiss" />}
              </GriffelInteractionTag>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
