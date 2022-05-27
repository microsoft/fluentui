import * as React from 'react';

import { Alert } from '../index';

export const Intent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert
      intent="success"
      action={{
        appearance: 'transparent',
        children: 'Undo',
      }}
    >
      Success text
    </Alert>
    <Alert
      intent="error"
      action={{
        appearance: 'transparent',
        children: 'Retry',
      }}
    >
      Error text
    </Alert>
    <Alert
      intent="warning"
      action={{
        appearance: 'transparent',
        children: 'Review',
      }}
    >
      Warning text
    </Alert>
    <Alert
      intent="info"
      action={{
        appearance: 'transparent',
        children: 'Dismiss',
      }}
    >
      Info text
    </Alert>
  </div>
);

Intent.storyName = 'Intent';
Intent.parameters = {
  docs: {
    description: {
      story: 'The intent is used to render a pre-configured Alert component with matching styles.',
    },
  },
};
