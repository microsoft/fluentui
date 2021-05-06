import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleSquare = () => (
  <div>
    <Avatar
      image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
      square
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar name="Cecil Folk" square status={{ color: 'red', title: 'Busy' }} />
    &emsp;
  </div>
);

export default AvatarExampleSquare;
