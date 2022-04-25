import * as React from 'react';
import { Avatar, AvatarGroup, AvatarGroupProps } from '../index';

export const Default = (props: Partial<AvatarGroupProps>) => (
  <AvatarGroup maxAvatars={1} {...props}>
    <Avatar />
    <Avatar />
  </AvatarGroup>
);
