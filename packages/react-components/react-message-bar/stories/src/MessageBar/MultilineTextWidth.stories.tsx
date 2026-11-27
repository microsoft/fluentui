import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Button,
  Link,
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';

export const MultilineTextWidth = (): JSXElement => (
  <MessageBar layout="multiline">
    <MessageBarBody>
      <MessageBarTitle>Descriptive title</MessageBarTitle>
      Message providing information to the user with actionable insights. Message providing information to the user with
      actionable insights. Message providing information to the user with actionable insights. <Link>Link</Link>
    </MessageBarBody>
    <MessageBarActions
      containerAction={<Button aria-label="dismiss" appearance="transparent" icon={<DismissRegular />} />}
    >
      <Button>Action</Button>
      <Button>Action</Button>
    </MessageBarActions>
  </MessageBar>
);

MultilineTextWidth.parameters = {
  docs: {
    description: {
      story:
        'Multiline text wraps within a bounded area and shrinks with the container. See the Reflow story for automatic layout.',
    },
  },
};
