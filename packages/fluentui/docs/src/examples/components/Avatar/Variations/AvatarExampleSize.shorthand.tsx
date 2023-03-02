import * as React from 'react';
import { Avatar, Grid, AvatarSizeValue } from '@fluentui/react-northstar';
import { AcceptIcon, UserFriendsIcon } from '@fluentui/react-icons-northstar';

const statusProps = {
  icon: <AcceptIcon />,
  color: 'green',
  title: 'Available',
};

const AvatarExampleSizeShorthand = () => (
  <Grid columns="80px 1fr">
    {(
      ['smallest', 'smaller', 'small', 'medium', 'medium-large', 'large', 'larger', 'largest'] as AvatarSizeValue[]
    ).map(size => (
      <React.Fragment key={size}>
        <strong>{size}</strong>
        <div>
          <Avatar
            size={size}
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            status={statusProps}
          />
          &emsp;
          <Avatar size={size} name="Cecil Folk" status={statusProps} />
          &emsp;
          <Avatar
            size={size}
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
          />
          &emsp;
          <Avatar size={size} icon={<UserFriendsIcon />} />
          &emsp;
          <Avatar
            size={size}
            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
            square
          />
        </div>
      </React.Fragment>
    ))}
  </Grid>
);

export default AvatarExampleSizeShorthand;
