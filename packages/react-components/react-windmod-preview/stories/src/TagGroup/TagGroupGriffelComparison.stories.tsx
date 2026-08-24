import * as React from 'react';
import { FluentProvider, Tag, TagGroup } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Tag as GriffelTag,
  TagGroup as GriffelTagGroup,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'filled' | 'outline' | 'brand';
  size?: 'medium' | 'small' | 'extra-small';
  disabled?: boolean;
  dismissible?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'filled medium', props: {} },
    { label: 'small', props: { size: 'small' } },
    { label: 'extra-small', props: { size: 'extra-small' } },
    { label: 'outline', props: { appearance: 'outline' } },
    { label: 'brand', props: { appearance: 'brand' } },
    { label: 'brand small', props: { appearance: 'brand', size: 'small' } },
    { label: 'dismissible', props: { dismissible: true } },
    { label: 'dismissible extra-small', props: { dismissible: true, size: 'extra-small' } },
    { label: 'disabled', props: { disabled: true } },
    { label: 'dismissible disabled', props: { dismissible: true, disabled: true } },
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
              <TagGroup {...props}>
                <Tag>One</Tag>
                <Tag>Two</Tag>
                <Tag>Three</Tag>
              </TagGroup>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelTagGroup {...props}>
                <GriffelTag>One</GriffelTag>
                <GriffelTag>Two</GriffelTag>
                <GriffelTag>Three</GriffelTag>
              </GriffelTagGroup>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
