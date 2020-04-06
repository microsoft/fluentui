import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';

const AlertExampleDismissActionRtl = () => (
  <Alert
    actions={[
      {
        content: 'مرحبا',
        primary: true,
      },
      {
        content: 'عالم',
      },
    ]}
    icon={<ExclamationTriangleIcon />}
    content="مرحبا العالم"
  />
);

export default AlertExampleDismissActionRtl;
