import * as React from 'react';
import { DeleteRegular } from '@fluentui/react-icons';

import { Alert } from '@fluentui/react-alert';

export const Icon = () => (
  <Alert icon={<DeleteRegular />} action="Undo">
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
