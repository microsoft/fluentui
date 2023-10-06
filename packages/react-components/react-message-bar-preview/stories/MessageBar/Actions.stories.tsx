import * as React from 'react';
import { Button, Link } from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from '@fluentui/react-message-bar-preview';

export const Actions = () => (
  <MessageBar>
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights. <Link>Link</Link>
    </MessageBarBody>
    <MessageBarActions containerAction={<Button appearance="transparent" icon={<DismissRegular />} />}>
      <Button>Action</Button>
      <Button>Action</Button>
    </MessageBarActions>
  </MessageBar>
);

Actions.parameters = {
  docs: {
    description: {
      story: ['The `MessageBar` can have different actions.'].join('\n'),
    },
  },
};
