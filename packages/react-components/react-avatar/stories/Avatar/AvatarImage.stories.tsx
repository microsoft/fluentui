import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

export const Image = () => (
  <Avatar
    name="Katri Athokas"
    image={{ src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg' }}
  />
);

Image.parameters = {
  docs: {
    description: {
      story:
        'An avatar can display an image.<br/>' +
        'It is recommended to also include a name in addition to the image: the initials from the name are ' +
        'displayed while the image is loading, and the name makes the Avatar accessible to screen readers.',
    },
  },
};
