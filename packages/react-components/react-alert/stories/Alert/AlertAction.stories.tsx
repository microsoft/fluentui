import * as React from 'react';
import { DismissCircleRegular } from '@fluentui/react-icons';

import { Alert } from '@fluentui/react-alert';
import { FluentProvider, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-components';

export const Action = () => (
  <>
    {[teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme].map(theme => (
      <FluentProvider theme={theme} key="action-alert">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Alert intent="success" action="Undo">
            Message sent
          </Alert>
          <Alert
            intent="error"
            action={{
              icon: <DismissCircleRegular aria-label="dismiss message" />,
            }}
          >
            Save failed
          </Alert>
        </div>{' '}
      </FluentProvider>
    ))}
  </>
);

Action.storyName = 'Action';
Action.parameters = {
  docs: {
    description: {
      story: 'An alert can have an action button to prompt the user to act on it.',
    },
  },
};
