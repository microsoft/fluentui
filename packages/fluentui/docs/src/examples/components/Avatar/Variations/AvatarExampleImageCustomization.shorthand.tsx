import * as React from 'react';
import { Avatar, Icon } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

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
          <Icon
            {...{ ...props, avatar: undefined, fluid: undefined }}
            name="lock"
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
