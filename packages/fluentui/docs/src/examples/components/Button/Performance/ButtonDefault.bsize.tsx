import * as React from 'react';
import { Provider, themes, Button } from '@fluentui/react-northstar';

const ButtonDefaultBsize = () => (
  <Provider theme={themes.teams}>
    <Button content="Click here" />
  </Provider>
);

export default ButtonDefaultBsize;
