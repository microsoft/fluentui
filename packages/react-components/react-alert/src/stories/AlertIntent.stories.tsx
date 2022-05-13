import * as React from 'react';

import { Delete16Filled } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Intent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert
      intent="success"
      content="Success text"
      action={{
        appearance: 'transparent',
        children: 'Undo',
      }}
    />
    <Alert
      intent="error"
      content="Error text"
      action={{
        appearance: 'transparent',
        children: 'Retry',
      }}
    />
    <Alert
      intent="warning"
      content="Warning text"
      action={{
        appearance: 'transparent',
        children: 'Review',
      }}
    />
    <Alert
      intent="info"
      content="Info text"
      action={{
        appearance: 'transparent',
        children: 'Dismiss',
      }}
    />
    <Alert
      intent="success"
      content="Success intent overrides the Delete icon prop"
      icon={<Delete16Filled primaryFill="red" />}
      action={{
        appearance: 'transparent',
        children: 'Dismiss',
      }}
    />
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
