import * as React from 'react';
import { Avatar, Provider, AcceptIcon } from '@fluentui/react-northstar';

const AvatarExampleShorthand = () => (
  <Provider
    theme={{
      componentStyles: {
        AvatarStatus: {
          root: ({ variables: v }) => ({ ...(v.isFoo && { backgroundColor: 'red' }) }),
        },
      },
    }}
  >
    <Avatar
      status={{
        icon: <AcceptIcon />,
        title: 'Available',
      }}
    />
    <Avatar
      status={{
        icon: <AcceptIcon />,
        title: 'Available',
        variables: { isFoo: true },
      }}
    />
  </Provider>
);

export default AvatarExampleShorthand;
