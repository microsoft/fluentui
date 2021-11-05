import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta
import { Guest20Regular } from '@fluentui/react-icons';

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
