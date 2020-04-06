import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      image="public/images/avatar/small/matt.jpg"
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar image="public/images/avatar/small/matt.jpg" status={{ color: 'red', title: 'Busy' }} />
    &emsp;
    <Avatar image="public/images/avatar/small/matt.jpg" status={{ color: 'grey', title: 'Offline' }} />
    &emsp;
  </div>
);

export default AvatarExampleStatusShorthand;
