import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleSquare = () => (
  <div>
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      square
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar name="John Doe" square status={{ color: 'red', title: 'Busy' }} />
    &emsp;
  </div>
);

export default AvatarExampleSquare;
