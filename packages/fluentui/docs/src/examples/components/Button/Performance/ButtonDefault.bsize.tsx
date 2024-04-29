import * as React from 'react';
import { Provider, teamsTheme, Button } from '@fluentui/react-northstar';

const ButtonDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Button content="Click here" />
  </Provider>
);

export default ButtonDefaultBsize;
