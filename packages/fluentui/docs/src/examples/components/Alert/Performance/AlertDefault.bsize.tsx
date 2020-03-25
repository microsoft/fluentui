import * as React from 'react';
import { Provider, themes, Alert } from '@fluentui/react-northstar';

const AlertDefaultBsize = () => (
  <Provider theme={themes.teams}>
    <Alert content="This is a default alert" />
  </Provider>
);

export default AlertDefaultBsize;
