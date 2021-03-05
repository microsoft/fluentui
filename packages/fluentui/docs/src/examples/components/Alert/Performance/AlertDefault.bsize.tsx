import * as React from 'react';
import { Provider, teamsTheme, Alert } from '@fluentui/react-northstar';

const AlertDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Alert content="This is a default alert" />
  </Provider>
);

export default AlertDefaultBsize;
