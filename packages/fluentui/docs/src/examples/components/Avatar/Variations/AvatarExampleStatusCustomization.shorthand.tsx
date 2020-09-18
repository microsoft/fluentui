import * as React from 'react';
import { Avatar, Grid, Text } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const defaultAvatar = (
  <Avatar
    image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
    status={{
      color: 'green',
      icon: <AcceptIcon />,
      title: 'Available',
    }}
  />
);

const AvatarExampleStatusCustomizationShorthand = () => (
  <Grid
    styles={{
      gridTemplateColumns: '50% 50px 50px',
      msGridColumns: '50% 50px 50px',
      justifyContent: 'start',
      justifyItems: 'start',
      gap: '10px',
      alignItems: 'center',
    }}
  >
    <Text content="Status can receive variables." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      }}
      variables={{ statusBorderColor: 'orange' }}
    />
    <Text content="Avatar and its status are proportionate (share the same size value) by default." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size="larger"
      status={{
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
      }}
    />
    <Text content="Status can have different size for the same avatar size." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      status={{
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
        size: 'larger',
      }}
    />
    <Text content="Status can have same size for different avatar sizes." />
    {defaultAvatar}
    <Avatar
      image={{ src: 'public/images/avatar/small/matt.jpg', alt: 'Profile picture of Matt' }}
      size="larger"
      status={{
        color: 'green',
        icon: <AcceptIcon />,
        title: 'Available',
        size: 'medium',
      }}
    />
  </Grid>
);

export default AvatarExampleStatusCustomizationShorthand;
