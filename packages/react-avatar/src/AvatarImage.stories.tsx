import * as React from 'react';
import { Avatar } from './index';

export const Image = () => (
  <Avatar
    name="Katri Athokas"
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
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
