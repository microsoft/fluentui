import * as React from 'react';
import { Button, Link } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import {
  MessageBar,
  MessageBarActions,
  MessageBarTitle,
  MessageBarBody,
  MessageBarIntent,
} from '@fluentui/react-message-bar-preview';

const intents: MessageBarIntent[] = ['info', 'warning', 'error', 'success'];

export const Intent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {intents.map(intent => (
      <MessageBar key={intent} intent={intent}>
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

Intent.parameters = {
  docs: {
    description: {
      story: [
        'MessageBar components come built-in with preset intents that determine the design and aria live announcment,',
        "While it is recommended to use the preset intents, it's possible to configure the aria live politeness",
        'with the `politeness` prop.',
      ].join('\n'),
    },
  },
};
