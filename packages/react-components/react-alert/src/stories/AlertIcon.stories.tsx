import * as React from 'react';

import { DeleteRegular } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Icon = () => (
  <Alert
    icon={<DeleteRegular />}
    action={{
      appearance: 'transparent',
      children: 'Undo',
    }}
  >
    Chat deleted
  </Alert>
);

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'An alert can render a custom icon if provided.',
    },
  },
};
