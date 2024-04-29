import * as React from 'react';
import { Avatar, Grid, Text } from '@fluentui/react-northstar';
import { AcceptIcon } from '@fluentui/react-icons-northstar';

const defaultAvatar = (
  <Avatar
    image={{
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
      alt: 'Profile picture of Robert',
    }}
    status={{
      color: 'green',
      icon: <AcceptIcon />,
      title: 'Available',
    }}
  />
);

const AvatarExampleStatusCustomizationShorthand = () => (
  <Grid
    columns="50% 50px 50px"
    styles={{ justifyContent: 'start', justifyItems: 'start', gap: '10px', alignItems: 'center' }}
  >
    <Text content="Status can receive variables." />
    {defaultAvatar}
    <Avatar
      image={{
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
        alt: 'Profile picture of Robert',
      }}
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
      image={{
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
        alt: 'Profile picture of Robert',
      }}
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
      image={{
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
        alt: 'Profile picture of Robert',
      }}
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
      image={{
        src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
        alt: 'Profile picture of Robert',
      }}
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
