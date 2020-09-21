import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';

const AlertExampleImportantMessage = () => (
  <Alert
    warning
    icon={<ExclamationTriangleIcon />}
    header="Your password may have been compromised"
    content="Please change your password"
    dismissible
  />
);

export default AlertExampleImportantMessage;
