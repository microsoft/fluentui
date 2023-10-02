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

const intents = ['info', 'warning', 'error', 'success'] as MessageBarIntent[];
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
        'The MessageBar component comes with different intents - these represent design and aria announcement presets.',
        'While we recommend developers to use the preset intents, it is possible to customize the aria announcement',
        'politeness with the `politeness` prop.',
      ].join('\n'),
    },
  },
};
