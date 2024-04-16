import * as React from 'react';

import { teamsLightTheme, FluentProvider } from '@fluentui/react-components';

export const FluentWapper: React.FunctionComponent = ({ children }) => {
  return <FluentProvider theme={teamsLightTheme}>{children}</FluentProvider>;
};
