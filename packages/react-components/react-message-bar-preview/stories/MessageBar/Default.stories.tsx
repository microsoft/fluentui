import * as React from 'react';
import { Link } from '@fluentui/react-components';
import { MessageBar, MessageBarTitle, MessageBarBody } from '@fluentui/react-message-bar-preview';

export const Default = () => (
  <MessageBar>
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights. <Link>Link</Link>
    </MessageBarBody>
  </MessageBar>
);
