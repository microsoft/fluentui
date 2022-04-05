import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleNameShorthand = () => (
  <Avatar
    name="Cecil Folk"
    status={{
      color: 'green',
      icon: <AcceptIcon />,
      title: 'Available',
    }}
  />
);

export default AvatarExampleNameShorthand;
