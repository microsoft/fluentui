import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Image = (props: Partial<AvatarProps>) => (
  <Avatar
    {...props}
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      alt: 'A profile picture of Katri Athokas',
    }}
  />
);
