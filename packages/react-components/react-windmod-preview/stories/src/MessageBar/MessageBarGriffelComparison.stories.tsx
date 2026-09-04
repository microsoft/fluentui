import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-windmod-preview/message-bar';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  MessageBar as GriffelMessageBar,
  MessageBarActions as GriffelMessageBarActions,
  MessageBarBody as GriffelMessageBarBody,
  MessageBarTitle as GriffelMessageBarTitle,
  webLightTheme,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';
import { DismissRegular as GriffelDismissRegular } from '@fluentui/react-icons';

import styles from '../compare.module.css';

type Variant = {
  label: string;
  intent?: 'info' | 'success' | 'warning' | 'error';
  shape?: 'rounded' | 'square';
  layout: 'singleline' | 'multiline';
  title?: boolean;
  actions?: boolean;
};

const variants: Variant[] = [
  { label: 'info', intent: 'info', layout: 'singleline' },
  { label: 'success', intent: 'success', layout: 'singleline' },
  { label: 'warning', intent: 'warning', layout: 'singleline' },
  { label: 'error', intent: 'error', layout: 'singleline' },
  { label: 'square', intent: 'warning', shape: 'square', layout: 'singleline' },
  { label: 'title', intent: 'info', layout: 'singleline', title: true },
  { label: 'actions', intent: 'error', layout: 'singleline', title: true, actions: true },
  { label: 'multiline', intent: 'info', layout: 'multiline', title: true },
  { label: 'multiline actions', intent: 'error', layout: 'multiline', title: true, actions: true },
];

const bar: React.CSSProperties = { width: 400 };

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <div className={styles.header}>Variant</div>
    <div className={styles.header}>Windmod</div>
    <div className={styles.header}>Griffel</div>

    {variants.map(variant => (
      <React.Fragment key={variant.label}>
        <div className={styles.label}>{variant.label}</div>

        <FluentProvider>
          <MessageBar intent={variant.intent} shape={variant.shape} layout={variant.layout} style={bar}>
            <MessageBarBody>
              {variant.title ? <MessageBarTitle>Heads up</MessageBarTitle> : null}
              Descriptive message text.
            </MessageBarBody>
            {variant.actions ? (
              <MessageBarActions
                containerAction={
                  <Button size="small" appearance="transparent" icon={<DismissRegular />} aria-label="dismiss" />
                }
              >
                <Button size="small">Action</Button>
              </MessageBarActions>
            ) : null}
          </MessageBar>
        </FluentProvider>

        <GriffelFluentProvider theme={webLightTheme}>
          <GriffelMessageBar intent={variant.intent} shape={variant.shape} layout={variant.layout} style={bar}>
            <GriffelMessageBarBody>
              {variant.title ? <GriffelMessageBarTitle>Heads up</GriffelMessageBarTitle> : null}
              Descriptive message text.
            </GriffelMessageBarBody>
            {variant.actions ? (
              <GriffelMessageBarActions
                containerAction={
                  <GriffelButton
                    size="small"
                    appearance="transparent"
                    icon={<GriffelDismissRegular />}
                    aria-label="dismiss"
                  />
                }
              >
                <GriffelButton size="small">Action</GriffelButton>
              </GriffelMessageBarActions>
            ) : null}
          </GriffelMessageBar>
        </GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
