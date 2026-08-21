import * as React from 'react';
import { Divider, ThemeProvider } from '@fluentui/react-windmod-preview';
import { Divider as GriffelDivider, FluentProvider, webLightTheme } from '@fluentui/react-components';

import styles from '../compare.module.css';

const alignments = ['start', 'center', 'end'] as const;
const appearances = ['default', 'brand', 'subtle', 'strong'] as const;

type LookProps = {
  alignContent?: (typeof alignments)[number];
  appearance?: (typeof appearances)[number];
  inset?: boolean;
  vertical?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps; childless?: boolean }> = [
    ...appearances.map(appearance => ({ label: appearance, props: { appearance } })),
    ...alignments.map(alignContent => ({ label: alignContent, props: { alignContent } })),
    { label: 'inset', props: { inset: true } },
    { label: 'childless', props: {}, childless: true },
    { label: 'vertical', props: { vertical: true } },
    { label: 'vertical inset', props: { vertical: true, inset: true } },
    { label: 'vertical childless', props: { vertical: true }, childless: true },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>
      {variants.map(({ label, props, childless }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <div style={{ display: 'flex', height: props.vertical ? 120 : undefined }}>
            <ThemeProvider>
              <Divider {...props}>{childless ? undefined : 'Divider'}</Divider>
            </ThemeProvider>
          </div>
          <div style={{ display: 'flex', height: props.vertical ? 120 : undefined }}>
            <FluentProvider theme={webLightTheme}>
              <GriffelDivider {...props}>{childless ? undefined : 'Divider'}</GriffelDivider>
            </FluentProvider>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
