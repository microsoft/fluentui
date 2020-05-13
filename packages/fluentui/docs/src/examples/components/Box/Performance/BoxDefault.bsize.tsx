import * as React from 'react';
import { Provider, themes, Box } from '@fluentui/react-northstar';

const BoxDefaultBsize = () => (
  <Provider theme={themes.teams}>
    <Box content="Box" />
  </Provider>
);

export default BoxDefaultBsize;
