import * as React from 'react';

import { DeleteRegular } from '@fluentui/react-icons';

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
    <Alert
      intent="success"
      icon={<DeleteRegular />}
      action={{
        appearance: 'transparent',
        children: 'Dismiss',
      }}
    >
      Delete icon overrides the success intent prop
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
