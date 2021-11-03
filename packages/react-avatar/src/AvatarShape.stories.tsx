import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Shape = (props: Partial<AvatarProps>) => (
  <>
    <Avatar {...props} shape="circular" />
    <Avatar {...props} shape="square" />
  </>
);
