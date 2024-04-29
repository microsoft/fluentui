import * as React from 'react';
import { Provider, teamsTheme, Box } from '@fluentui/react-northstar';

const BoxDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Box content="Box" />
  </Provider>
);

export default BoxDefaultBsize;
