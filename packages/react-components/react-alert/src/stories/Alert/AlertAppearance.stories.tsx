import * as React from 'react';
import { Alert } from '@fluentui/react-alert';
import { Title3 } from '@fluentui/react-text';

const renderAlerts = (appearance: 'primary' | 'inverted') => (
  <div style={{ flexGrow: 1 }}>
    <Title3>{appearance}</Title3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Alert appearance={appearance} intent="success" action="Undo">
        Success text
      </Alert>
      <Alert appearance={appearance} intent="error" action="Retry">
        Error text
      </Alert>
      <Alert appearance={appearance} intent="warning" action="Review">
        Warning text
      </Alert>
      <Alert appearance={appearance} intent="info" action="Dismiss">
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
      story: 'An alert can render with `primary` or `inverted` styles by passing that value to the `appearance` prop.',
    },
  },
};
