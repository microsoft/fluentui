import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-windmod-preview/message-bar';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import styles from '../compare.module.css';

const intents = ['info', 'success', 'warning', 'error'] as const;
const shapes = ['rounded', 'square'] as const;
const layouts = ['singleline', 'multiline'] as const;

const bar: React.CSSProperties = { width: 460 };

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.stack}>
      {intents.map(intent => (
        <MessageBar key={intent} intent={intent} style={bar}>
          <MessageBarBody>Descriptive text for the {intent} intent.</MessageBarBody>
        </MessageBar>
      ))}

      {shapes.map(shape => (
        <MessageBar key={shape} shape={shape} intent="warning" style={bar}>
          <MessageBarBody>Shape {shape}.</MessageBarBody>
        </MessageBar>
      ))}

      {layouts.map(layout => (
        <MessageBar key={layout} layout={layout} intent="success" style={bar}>
          <MessageBarBody>
            <MessageBarTitle>Layout {layout}</MessageBarTitle>
            The title is followed by a separating space the body inherits.
          </MessageBarBody>
        </MessageBar>
      ))}

      {layouts.map(layout => (
        <MessageBar key={layout} layout={layout} intent="error" style={bar}>
          <MessageBarBody>
            <MessageBarTitle>Upload failed</MessageBarTitle>
            The file exceeds the size limit.
          </MessageBarBody>
          <MessageBarActions
            containerAction={
              <Button size="small" appearance="transparent" icon={<DismissRegular />} aria-label="dismiss" />
            }
          >
            <Button size="small">Retry</Button>
            <Button size="small">Cancel</Button>
          </MessageBarActions>
        </MessageBar>
      ))}
    </div>
  </FluentProvider>
);
