import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';

const AlertExampleUrgent = () => (
  <Alert
    content="This is an urgent alert"
    dismissible
    dismissAction={{ 'aria-label': 'close' }}
    variables={{ urgent: true }}
  />
);

export default AlertExampleUrgent;
