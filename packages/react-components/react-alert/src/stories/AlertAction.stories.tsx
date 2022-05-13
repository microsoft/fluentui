import * as React from 'react';

import { ArrowUndo16Filled } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Action = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert
      intent="success"
      content="Message sent"
      action={{
        appearance: 'transparent',
        children: 'Undo',
      }}
    />
    <Alert
      intent="error"
      content="Save failed"
      action={{
        appearance: 'transparent',
        icon: <ArrowUndo16Filled />,
      }}
    />
  </div>
);

Action.storyName = 'Action';
Action.parameters = {
  docs: {
    description: {
      story: 'An alert can have an action button to prompt the user to act on it.',
    },
  },
};
