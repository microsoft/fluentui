import * as React from 'react';
import { DismissCircleRegular } from '@fluentui/react-icons';

import { Alert } from '@fluentui/react-alert';

export const Avatar = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Alert action="Undo" avatar={{ name: 'Jane Doe', size: 24, color: 'dark-red' }}>
      sent you a message
    </Alert>
    <Alert
      action={{
        icon: <DismissCircleRegular />,
      }}
      avatar={{ name: 'John Smith', size: 24, color: 'dark-green' }}
    >
      mentioned you
    </Alert>
  </div>
);

Avatar.storyName = 'Avatar';
Avatar.parameters = {
  docs: {
    description: {
      story: 'An alert can render a given Avatar instead of an icon.',
    },
  },
};
