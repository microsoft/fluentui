import * as React from 'react';
import { Alert } from '@fluentui/react-alert';
import { Title3 } from '@fluentui/react-text';

const renderAlerts = (appearance: 'primary' | 'inverted') => (
  <div style={{ flexGrow: 1 }}>
    <Title3>{appearance}</Title3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Alert
        appearance={appearance}
        intent="success"
        action={{
          children: 'Undo',
        }}
      >
        Success text
      </Alert>
      <Alert
        appearance={appearance}
        intent="error"
        action={{
          children: 'Retry',
        }}
      >
        Error text
      </Alert>
      <Alert
        appearance={appearance}
        intent="warning"
        action={{
          children: 'Review',
        }}
      >
        Warning text
      </Alert>
      <Alert
        appearance={appearance}
        intent="info"
        action={{
          children: 'Dismiss',
        }}
      >
        Info text
      </Alert>
    </div>
  </div>
);

export const Appearance = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    {renderAlerts('primary')}
    {renderAlerts('inverted')}
  </div>
);

Appearance.storyName = 'Appearance';
Appearance.parameters = {
  docs: {
    description: {
      story: "An alert's styles can be inverted by setting the `appearance` prop to `inverted`",
    },
  },
};
