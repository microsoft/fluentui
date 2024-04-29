import * as React from 'react';
import { Alert } from '@fluentui/react-alert';

export const Intent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    {/* eslint-disable-next-line deprecation/deprecation */}
    <Alert intent="success" action="Undo">
      Success text
    </Alert>
    {/* eslint-disable-next-line deprecation/deprecation */}
    <Alert intent="error" action="Retry">
      Error text
    </Alert>
    {/* eslint-disable-next-line deprecation/deprecation */}
    <Alert intent="warning" action="Review">
      Warning text
    </Alert>
    {/* eslint-disable-next-line deprecation/deprecation */}
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
