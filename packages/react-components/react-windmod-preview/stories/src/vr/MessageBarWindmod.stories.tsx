import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { Link } from '@fluentui/react-windmod-preview/link';
import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-windmod-preview/message-bar';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { MessageBarVrScene } from './MessageBarVrScene';

export const MessageBarWindmod = (): React.ReactNode => (
  <FluentProvider>
    <MessageBarVrScene
      MessageBar={MessageBar}
      MessageBarTitle={MessageBarTitle}
      MessageBarBody={MessageBarBody}
      MessageBarActions={MessageBarActions}
      Button={Button}
      Link={Link}
      DismissIcon={DismissRegular}
    />
  </FluentProvider>
);
