import * as React from 'react';
import { Avatar, AvatarProps } from './index';
import { Guest20Regular } from '@fluentui/react-icons';

export const Icon = (props: Partial<AvatarProps>) => {
  return <Avatar {...props} icon={<Guest20Regular />} />;
};
