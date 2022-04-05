import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';

const AlertExampleIcon = () => (
  <Alert icon={<ExclamationTriangleIcon />} content="This is an alert with a warning icon" />
);

export default AlertExampleIcon;
