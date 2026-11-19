import * as React from 'react';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { Tag } from '@fluentui/react-windmod-preview/tag';
import { FluentProvider as GriffelFluentProvider, Tag as GriffelTag, webLightTheme } from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'filled' | 'outline' | 'brand';
  shape?: 'rounded' | 'circular';
  size?: 'medium' | 'small' | 'extra-small';
  disabled?: boolean;
  dismissible?: boolean;
  selected?: boolean;
  secondaryText?: string;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'filled rounded medium', props: {} },
    { label: 'outline', props: { appearance: 'outline' } },
    { label: 'brand', props: { appearance: 'brand' } },
    { label: 'circular', props: { shape: 'circular' } },
    { label: 'small', props: { size: 'small' } },
    { label: 'extra-small', props: { size: 'extra-small' } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'outline disabled', props: { appearance: 'outline', disabled: true } },
    { label: 'selected', props: { selected: true } },
    { label: 'selected disabled', props: { selected: true, disabled: true } },
    { label: 'dismissible', props: { dismissible: true } },
    { label: 'dismissible small circular', props: { dismissible: true, size: 'small', shape: 'circular' } },
    { label: 'secondary text', props: { secondaryText: 'Secondary' } },
    { label: 'secondary text dismissible', props: { secondaryText: 'Secondary', dismissible: true } },
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
              <Tag {...props}>Primary</Tag>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelTag {...props}>Primary</GriffelTag>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
