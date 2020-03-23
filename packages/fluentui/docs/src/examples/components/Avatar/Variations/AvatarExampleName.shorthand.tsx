import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';

const AvatarExampleNameShorthand = () => (
  <Avatar
    name="John Doe"
    status={{
      color: 'green',
      icon: 'icon-checkmark',
      title: 'Available',
    }}
  />
);

export default AvatarExampleNameShorthand;
