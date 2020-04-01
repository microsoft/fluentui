import * as React from 'react';
import { Provider, themes, Avatar } from '@fluentui/react-northstar';

const AvatarDefaultBsize = () => (
  <Provider theme={themes.teams}>
    <Avatar name="John Doe" />
  </Provider>
);

export default AvatarDefaultBsize;
