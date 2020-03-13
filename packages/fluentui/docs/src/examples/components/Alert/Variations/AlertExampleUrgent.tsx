import * as React from 'react';
import { Alert } from '@fluentui/react-experimental';

const AlertExampleUrgent = () => (
  <Alert dismissible variables={{ urgent: true }}>
    This is an urgent alert
  </Alert>
);

export default AlertExampleUrgent;
