import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleStatusShorthand = () => (
  <div>
    <Avatar
      image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar
      image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
      status={{ color: 'red', title: 'Busy' }}
    />
    &emsp;
    <Avatar
      image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
      status={{ color: 'grey', title: 'Offline' }}
    />
    &emsp;
  </div>
);

export default AvatarExampleStatusShorthand;
