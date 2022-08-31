import * as React from 'react';
import { Avatar } from '@fluentui/react-northstar';

const AvatarExampleStatusImageShorthand = () => (
  <Avatar
    image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
    size="larger"
    status={{
      image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
      title: 'Robert Tolbert',
    }}
  />
);

export default AvatarExampleStatusImageShorthand;
