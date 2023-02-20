import * as React from 'react';
import { DismissCircleRegular } from '@fluentui/react-icons';

import { Alert } from '@fluentui/react-alert';

export const Action = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert intent="success" action="Undo">
      Message sent
    </Alert>
    <Alert
      intent="error"
      action={{
        icon: <DismissCircleRegular aria-label="dismiss message" />,
      }}
    >
      Save failed
    </Alert>
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
