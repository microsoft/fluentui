import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';
import { AcceptIcon, LockIcon } from '@fluentui/react-icons-northstar';

const AvatarExampleImageCustomizationShorthand = () => (
  <>
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of John Doe' }}
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar
      image="public/images/avatar/large/jerry.png"
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
    &emsp;
    <Avatar
      image={{
        name: 'chess rook',
        // This example does not react to the avatar size variable
        // and otherwise produces bad results when border is applied compared to "normal" image
        children: (ComponentType, props) => (
          <LockIcon
            {...{ ...props, avatar: undefined, fluid: undefined }}
            circular
            bordered
            variables={{ color: 'blue' }}
            styles={{ boxSizing: 'border-box', padding: '8px' }}
          />
        ),
      }}
      status={{ color: 'green', icon: <AcceptIcon />, title: 'Available' }}
    />
  </>
);

export default AvatarExampleImageCustomizationShorthand;
