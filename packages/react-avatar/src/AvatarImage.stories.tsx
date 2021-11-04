import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const Image = (props: Partial<AvatarProps>) => (
  <Avatar
    {...props}
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
      alt: 'A profile picture of Katri Athokas',
    }}
  />
);

Image.parameters = {
  docs: {
    description: {
      story: 'An avatar can display an image.',
    },
  },
};
