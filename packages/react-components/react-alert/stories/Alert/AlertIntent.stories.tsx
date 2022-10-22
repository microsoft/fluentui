import * as React from 'react';
import { Alert } from '@fluentui/react-alert';

export const Intent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert intent="success" action="Undo">
      Success text
    </Alert>
    <Alert intent="error" action="Retry">
      Error text
    </Alert>
    <Alert intent="warning" action="Review">
      Warning text
    </Alert>
    <Alert intent="info" action="Dismiss">
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
