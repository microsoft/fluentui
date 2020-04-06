import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const status = { color: 'green', icon: <AcceptIcon />, title: 'Available' };

const AvatarExampleExcludedInitialsShorthand = () => (
  <div>
    <Avatar name="John Doe (Software Developer)" status={status} />
    &emsp;
    <Avatar name="John Doe {Software Developer}" status={status} />
    &emsp;
    <Avatar name="John Doe [Software Developer]" status={status} />
    &emsp;
    <Avatar name="John A B Doe" status={status} />
  </div>
);

export default AvatarExampleExcludedInitialsShorthand;
