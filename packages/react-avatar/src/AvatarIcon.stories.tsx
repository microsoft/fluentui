import * as React from 'react';
import { Guest20Regular } from '@fluentui/react-icons';

import { Avatar, AvatarProps } from './index';

export const Icon = (props: Partial<AvatarProps>) => {
  return <Avatar {...props} icon={<Guest20Regular />} />;
};

Icon.parameters = {
  docs: {
    description: {
      story: 'An avatar can display an icon.',
    },
  },
};
