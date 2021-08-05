import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const getInitials = name => name.split(' ').map(word => `${word[0]}.`);

const AvatarExampleGetInitialsShorthand = () => (
  <Avatar
    name="Cecil Folk"
    getInitials={getInitials}
    status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
  />
);

export default AvatarExampleGetInitialsShorthand;
