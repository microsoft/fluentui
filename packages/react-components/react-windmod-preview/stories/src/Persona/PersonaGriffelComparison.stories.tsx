import * as React from 'react';
import { FluentProvider, Persona } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Persona as GriffelPersona,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type LookProps = {
  name?: string;
  quaternaryText?: string;
  secondaryText?: string;
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge';
  tertiaryText?: string;
  textAlignment?: 'center' | 'start';
  textPosition?: 'after' | 'before' | 'below';
};

const name = 'Kevin Sturgis';
const lines = {
  secondaryText: 'Available',
  tertiaryText: 'Software Engineer',
  quaternaryText: 'Microsoft',
} as const;

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical. Neither column uses `presence` or `presenceOnly`:
 * the headless surface omits both, so windmod ships no counterpart to compare against.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Array<{ label: string; props: LookProps }> = [
    { label: 'extra-small', props: { name, size: 'extra-small', ...lines } },
    { label: 'small', props: { name, size: 'small', ...lines } },
    { label: 'medium', props: { name, ...lines } },
    { label: 'large', props: { name, size: 'large', ...lines } },
    { label: 'extra-large', props: { name, size: 'extra-large', ...lines } },
    { label: 'huge', props: { name, size: 'huge', ...lines } },
    { label: 'before', props: { name, textPosition: 'before', ...lines } },
    { label: 'below', props: { name, textPosition: 'below', ...lines } },
    { label: 'center', props: { name, size: 'extra-large', textAlignment: 'center', ...lines } },
    { label: 'one line', props: { name } },
    { label: 'two lines', props: { name, secondaryText: lines.secondaryText } },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>variant</div>
      <div className={styles.header}>windmod</div>
      <div className={styles.header}>griffel</div>

      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>
          <FluentProvider>
            <Persona {...props} />
          </FluentProvider>
          <GriffelFluentProvider theme={webLightTheme}>
            <GriffelPersona {...props} />
          </GriffelFluentProvider>
        </React.Fragment>
      ))}
    </div>
  );
};
