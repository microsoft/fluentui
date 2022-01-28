import * as React from 'react';
import { GuestRegular } from '@fluentui/react-icons';

import { Avatar, AvatarProps } from './index';

export const Icon = (props: Partial<AvatarProps>) => {
  return <Avatar {...props} icon={<GuestRegular />} />;
};

Icon.parameters = {
  docs: {
    description: {
      story: 'An avatar can display an icon.',
    },
  },
};
