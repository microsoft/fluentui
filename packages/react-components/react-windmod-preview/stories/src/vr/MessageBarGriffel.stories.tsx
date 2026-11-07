import * as React from 'react';
import {
  Button,
  FluentProvider,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
  webLightTheme,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

import { MessageBarVrScene } from './MessageBarVrScene';

export const MessageBarGriffel = (): React.ReactNode => (
  <FluentProvider theme={webLightTheme}>
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
