import * as React from 'react';

import { Alert } from '@fluentui/react-alert';
import { FluentProvider, teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-components';

export const Default = () => (
  <>
    {[teamsLightTheme, teamsDarkTheme, teamsHighContrastTheme].map(theme => (
      <FluentProvider theme={theme} key="default-alert">
        <Alert>This is a default alert!</Alert>
      </FluentProvider>
    ))}
  </>
);
