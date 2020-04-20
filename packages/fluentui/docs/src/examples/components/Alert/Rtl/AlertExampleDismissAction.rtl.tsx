import * as React from 'react';
import { Alert } from '@fluentui/react-northstar';
import { ExclamationTriangleIcon } from '@fluentui/react-icons-northstar';

const AlertExampleDismissActionRtl = () => (
  <Alert
    actions={[
      {
        key: 'content-1',
        content: 'مرحبا',
        primary: true,
      },
      {
        key: 'content-2',
        content: 'عالم',
      },
    ]}
    icon={<ExclamationTriangleIcon />}
    content="مرحبا العالم"
  />
);

export default AlertExampleDismissActionRtl;
