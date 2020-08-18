import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleRtl = () => (
  <Avatar
    name="جون دو"
    status={{
      color: 'green',
      icon: <AcceptIcon />,
    }}
  />
);

export default AvatarExampleRtl;
