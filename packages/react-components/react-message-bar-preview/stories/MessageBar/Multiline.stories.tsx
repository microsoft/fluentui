import * as React from 'react';
import { Button, Link } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from '@fluentui/react-message-bar-preview';

const intents = ['info', 'warning', 'error', 'success'] as const;

export const Multiline = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {intents.map(intent => (
      <MessageBar key={intent} layout="multiline" intent={intent}>
        <MessageBarBody>
          <MessageBarTitle>Descriptive title</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBarBody>
        <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
          <Button>Action</Button>
          <Button>Action</Button>
        </MessageBarActions>
      </MessageBar>
    ))}
  </div>
);
