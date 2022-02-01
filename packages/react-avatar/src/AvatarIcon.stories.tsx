import * as React from 'react';
import { GuestRegular } from '@fluentui/react-icons';

import { Avatar } from './index';

export const Icon = () => {
  return <Avatar icon={<GuestRegular />} aria-label="Guest Avatar" />;
};

Icon.parameters = {
  docs: {
    description: {
      story:
        'An avatar can display a custom icon. ' +
        'The icon will only be shown when there is no image or initals available.',
    },
  },
};
