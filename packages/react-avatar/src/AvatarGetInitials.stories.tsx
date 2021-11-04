import * as React from 'react';
import { Avatar, AvatarProps } from './index';

const formatter = (name: string, isRTL: boolean) => {
  return `${name[0]} ${name[name.length - 1]}`;
};

export const GetInitials = (props: Partial<AvatarProps>) => {
  return <Avatar {...props} name="Jane Doe" getInitials={formatter} />;
};
