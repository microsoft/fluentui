import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';

const AlertExampleOof = () => (
  <Alert
    content="This is an oof alert"
    dismissible
    dismissAction={{ 'aria-label': 'close' }}
    variables={{ oof: true }}
  />
);

export default AlertExampleOof;
