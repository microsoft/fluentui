import * as React from 'react';
import {
  Button,
  FluentProvider,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-windmod-preview';
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
