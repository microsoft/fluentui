import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const status = { color: 'green', icon: <AcceptIcon />, title: 'Available' };

const AvatarExampleExcludedInitialsShorthand = () => (
  <div>
    <Avatar name="Cecil Folk (Software Developer)" status={status} />
    &emsp;
    <Avatar name="Cecil Folk {Software Developer}" status={status} />
    &emsp;
    <Avatar name="Cecil Folk [Software Developer]" status={status} />
    &emsp;
    <Avatar name="Cecil A B Folk" status={status} />
  </div>
);

export default AvatarExampleExcludedInitialsShorthand;
