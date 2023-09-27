import * as React from 'react';
import { Button, Link } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { MessageBar, MessageBarTitle } from '@fluentui/react-message-bar-preview';

const intents = ['info', 'warning', 'error', 'success'] as const;

export const Default = () => (
  <>
    {intents.map(intent => (
      <>
        <MessageBar
          key={intent}
          intent={intent}
          action={<Button aria-label="dismiss" icon={<DismissRegular />} appearance="transparent" />}
          actions={
            <>
              <Button>Action</Button>
              <Button>Action</Button>
            </>
          }
        >
          <MessageBarTitle>Descriptive title</MessageBarTitle>
          Message providing information to the user with actionable insights. <Link>Link</Link>
        </MessageBar>
        <br />
      </>
    ))}
  </>
);
