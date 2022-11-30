import * as React from 'react';

import { Alert } from '@fluentui/react-alert';
import { FluentProvider, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-components';

const renderAlerts = (appearance: 'primary' | 'inverted') => (
  <div style={{ flexGrow: 1 }}>
    <p>{appearance}</p>
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
  <>
    {[teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme].map(theme => (
      <FluentProvider theme={theme} key={'appearance-toast'}>
        <div style={{ display: 'flex', gap: '20px', margin: '20px 0', padding: '20px' }}>
          {renderAlerts('primary')}
          {renderAlerts('inverted')}
        </div>{' '}
      </FluentProvider>
    ))}
  </>
);

Appearance.storyName = 'Appearance';
Appearance.parameters = {
  docs: {
    description: {
      story: 'An alert can render with `primary` or `inverted` styles by passing that value to the `appearance` prop.',
    },
  },
};
