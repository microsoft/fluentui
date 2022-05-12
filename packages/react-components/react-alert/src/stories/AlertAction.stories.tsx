import * as React from 'react';

import { ArrowUndo16Filled } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Action = () => (
  <>
    <Alert
      intent="success"
      content="Message sent"
      action={{
        appearance: 'transparent',
        children: 'Undo',
      }}
    />
    <br />
    <Alert
      intent="error"
      content="Save failed"
      action={{
        appearance: 'transparent',
        icon: <ArrowUndo16Filled />,
      }}
    />
  </>
);

Action.storyName = 'Action';
Action.parameters = {
  docs: {
    description: {
      story: 'An alert can render any button as an action button',
    },
  },
};
