import * as React from 'react';
import { FluentProvider, Link } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Link as GriffelLink,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  appearance?: 'default' | 'subtle';
  inline?: boolean;
  disabled?: boolean;
  disabledFocusable?: boolean;
  href?: string;
  as?: 'a' | 'button' | 'span';
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'default', props: { href: 'https://example.com' } },
    { label: 'subtle', props: { href: 'https://example.com', appearance: 'subtle' } },
    { label: 'inline', props: { href: 'https://example.com', inline: true } },
    { label: 'subtle inline', props: { href: 'https://example.com', appearance: 'subtle', inline: true } },
    { label: 'disabled', props: { href: 'https://example.com', disabled: true } },
    { label: 'disabled focusable', props: { href: 'https://example.com', disabledFocusable: true } },
    { label: 'as button', props: {} },
    { label: 'as span', props: { as: 'span' } },
    { label: 'as anchor, no href', props: { as: 'a' } },
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
              <Link {...props}>Link</Link>
            </FluentProvider>
          </div>
          <div>
            <GriffelFluentProvider theme={webLightTheme}>
              <GriffelLink {...props}>Link</GriffelLink>
            </GriffelFluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
