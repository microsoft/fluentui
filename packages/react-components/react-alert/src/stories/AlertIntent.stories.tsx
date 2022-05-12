import * as React from 'react';

import { Alert } from '../index';

export const Intent = () => (
  <>
    <Alert
      intent="success"
      content="Success text"
      action={{
        appearance: 'transparent',
        children: 'Undo',
      }}
    />
    <br />
    <Alert
      intent="error"
      content="Error text"
      action={{
        appearance: 'transparent',
        children: 'Retry',
      }}
    />
    <br />
    <Alert
      intent="warning"
      content="Warning text"
      action={{
        appearance: 'transparent',
        children: 'Review',
      }}
    />
    <br />
    <Alert
      intent="info"
      content="Info text"
      action={{
        appearance: 'transparent',
        children: 'Dismiss',
      }}
    />
  </>
);

Intent.storyName = 'Intent';
Intent.parameters = {
  docs: {
    description: {
      story: 'The intent is used to render a pre-configured Alert component with matching styles',
    },
  },
};
