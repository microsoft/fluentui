import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';

const AlertExampleDismissAction = () => (
  <Alert
    actions={[{ content: 'Privacy policy', key: 'privacy', primary: true }, 'Settings']}
    content="Get all the best inventions in your e-mail every day. Sign up now!"
    dismissible
    dismissAction={{ 'aria-label': 'close' }}
  />
);

export default AlertExampleDismissAction;
