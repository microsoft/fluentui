import * as React from 'react';
import { Provider, teamsTheme, Avatar } from '@fluentui/react-northstar';

const AvatarDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Avatar name="Cecil Folk" />
  </Provider>
);

export default AvatarDefaultBsize;
