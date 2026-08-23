import * as React from 'react';
import { Card, CardFooter, CardHeader, CardPreview, FluentProvider } from '@fluentui/react-windmod-preview';
import {
  Card as GriffelCard,
  CardFooter as GriffelCardFooter,
  CardHeader as GriffelCardHeader,
  CardPreview as GriffelCardPreview,
  FluentProvider as GriffelFluentProvider,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type CardProps = {
  appearance?: 'filled' | 'filled-alternative' | 'outline' | 'subtle';
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  selected?: boolean;
  onSelectionChange?: () => void;
};

const card: React.CSSProperties = { width: 240 };
const media = <span style={{ background: '#8a8886', paddingBlock: 20 }} />;
const glyph = <i style={{ display: 'block', width: 32, height: 32, background: '#605e5c' }} />;
const button = <i style={{ display: 'block', width: 40, height: 20, background: '#0078d4' }} />;
const noop = () => undefined;

type Variant = { label: string; props: CardProps; parts: 'text' | 'preview' | 'header' | 'header-full' };

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: Variant[] = [
    { label: 'small', props: { size: 'small' }, parts: 'text' },
    { label: 'medium', props: {}, parts: 'text' },
    { label: 'large', props: { size: 'large' }, parts: 'text' },
    { label: 'filled-alternative', props: { appearance: 'filled-alternative' }, parts: 'text' },
    { label: 'outline', props: { appearance: 'outline' }, parts: 'text' },
    { label: 'subtle', props: { appearance: 'subtle' }, parts: 'text' },
    { label: 'selected', props: { selected: true, onSelectionChange: noop }, parts: 'text' },
    { label: 'disabled', props: { disabled: true }, parts: 'text' },
    { label: 'preview, vertical', props: {}, parts: 'preview' },
    { label: 'preview, horizontal', props: { orientation: 'horizontal' }, parts: 'preview' },
    { label: 'header', props: {}, parts: 'header' },
    { label: 'header + description', props: {}, parts: 'header-full' },
  ];

  const body = (
    kind: Variant['parts'],
    Preview: typeof CardPreview,
    Header: typeof CardHeader,
    Footer: typeof CardFooter,
  ) => {
    if (kind === 'preview') {
      return (
        <>
          <Preview>{media}</Preview>
          <p style={{ margin: 0 }}>Card body</p>
        </>
      );
    }

    if (kind === 'header') {
      return (
        <>
          <Header header="Header" />
          <p style={{ margin: 0 }}>Card body</p>
          <Footer action={{ children: button }}>{button}</Footer>
        </>
      );
    }

    if (kind === 'header-full') {
      return (
        <>
          <Header image={{ children: glyph }} header="Header" description="Description" action={{ children: button }} />
          <p style={{ margin: 0 }}>Card body</p>
          <Footer action={{ children: button }}>{button}</Footer>
        </>
      );
    }

    return <p style={{ margin: 0 }}>Card body</p>;
  };

  return (
    <div className={styles.grid}>
      <span className={styles.header}>variant</span>
      <span className={styles.header}>windmod</span>
      <span className={styles.header}>griffel</span>

      {variants.map(({ label, props, parts }) => (
        <React.Fragment key={label}>
          <span className={styles.label}>{label}</span>
          <FluentProvider>
            <Card style={card} {...props}>
              {body(parts, CardPreview, CardHeader, CardFooter)}
            </Card>
          </FluentProvider>
          <GriffelFluentProvider theme={webLightTheme}>
            <GriffelCard style={card} focusMode="off" {...props}>
              {body(parts, GriffelCardPreview, GriffelCardHeader, GriffelCardFooter)}
            </GriffelCard>
          </GriffelFluentProvider>
        </React.Fragment>
      ))}
    </div>
  );
};
