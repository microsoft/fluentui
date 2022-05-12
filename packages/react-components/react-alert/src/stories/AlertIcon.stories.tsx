import * as React from 'react';

import { Alert } from '../index';
import { Delete16Filled } from '@fluentui/react-icons';

export const Icon = () => (
  <Alert
    icon={<Delete16Filled primaryFill="red" />}
    content="Chat deleted"
    action={{
      appearance: 'transparent',
      children: 'Undo',
    }}
  />
);

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'An alert can render any icon with a message',
    },
  },
};
