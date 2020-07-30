import * as React from 'react';
import Contact from './Contact';
import { AcceptIcon } from '@fluentui/react-icons-northstar';
import getAvatar from './avatarImages';

const participants = [
  <Contact
    name="Irving Kuhic"
    image={getAvatar(0)}
    status={{
      color: 'green',
      icon: <AcceptIcon />,
      title: 'Available',
    }}
  />,
  <Contact
    name="Skyler Parks"
    image={getAvatar(1)}
    status={{
      color: 'red',
      title: 'Away',
    }}
  />,
  <Contact
    name="Baby runolfsson"
    image={getAvatar(3)}
    status={{
      color: 'red',
      title: 'Away',
    }}
  />,
  <Contact
    name="Alvah kuhic"
    image={getAvatar(4)}
    status={{
      color: 'red',
      title: 'Away',
    }}
  />,
  <Contact
    name="Bobby metz"
    image={getAvatar(5)}
    status={{
      color: 'red',
      title: 'Away',
    }}
  />,
  <Contact
    name="Lucienne fisher"
    image={getAvatar(6)}
    status={{
      color: 'red',
      title: 'Away',
    }}
  />,
];

export default participants;
