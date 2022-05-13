import * as React from 'react';

import { Delete16Filled } from '@fluentui/react-icons';

import { Alert } from '../index';

export const Icon = () => (
  <Alert
    icon={<Delete16Filled primaryFill="red" />}
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
