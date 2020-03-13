import * as React from 'react';
import { Alert } from '@fluentui/react-experimental';

const AlertExampleImportantMessage = () => (
  <Alert
    warning
    icon="exclamation-triangle"
    header="Your password may have been compromised"
    content="Please change your password"
    dismissible
  />
);

export default AlertExampleImportantMessage;
