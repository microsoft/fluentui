import * as React from 'react';
import { FluentProvider, Link, Toast, ToastBody, ToastFooter, ToastTitle } from '@fluentui/react-windmod-preview';
import {
  FluentProvider as GriffelFluentProvider,
  Link as GriffelLink,
  Toast as GriffelToast,
  ToastBody as GriffelToastBody,
  ToastFooter as GriffelToastFooter,
  ToastTitle as GriffelToastTitle,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type Variant = { label: string; subtitle?: string; action?: string; footer?: boolean; inverted?: boolean };

const variants: Variant[] = [
  { label: 'title + body' },
  { label: 'subtitle', subtitle: 'Subtitle' },
  { label: 'action', action: 'Undo' },
  { label: 'footer', footer: true },
  { label: 'inverted', subtitle: 'Subtitle', action: 'Undo', inverted: true },
];

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider). The pair
 * in each row must be pixel-identical. The toasts render standalone rather than through a Toaster:
 * two Toasters would both promote to the top layer and could not share a row. The intent glyph and
 * its colour come from the toast container context, so they belong to the VR bands, not here.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <div className={styles.header}>Variant</div>
    <div className={styles.header}>Windmod</div>
    <div className={styles.header}>Griffel</div>

    {variants.map(({ label, subtitle, action, footer, inverted }) => (
      <React.Fragment key={label}>
        <div className={styles.label}>{label}</div>

        <FluentProvider>
          <Toast appearance={inverted ? 'inverted' : undefined}>
            <ToastTitle action={action}>Toast title</ToastTitle>
            <ToastBody subtitle={subtitle}>Toast body</ToastBody>
            {footer ? (
              <ToastFooter>
                <Link href="#">Action</Link>
                <Link href="#">Action</Link>
              </ToastFooter>
            ) : null}
          </Toast>
        </FluentProvider>

        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelToast appearance={inverted ? 'inverted' : undefined}>
            <GriffelToastTitle action={action}>Toast title</GriffelToastTitle>
            <GriffelToastBody subtitle={subtitle}>Toast body</GriffelToastBody>
            {footer ? (
              <GriffelToastFooter>
                <GriffelLink href="#">Action</GriffelLink>
                <GriffelLink href="#">Action</GriffelLink>
              </GriffelToastFooter>
            ) : null}
          </GriffelToast>
        </GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
