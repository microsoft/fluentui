import * as React from 'react';
import { Provider, teamsTheme, Avatar } from '@fluentui/react-northstar';

const AvatarDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Avatar name="John Doe" />
  </Provider>
);

export default AvatarDefaultBsize;
