import * as React from 'react';

import { teamsLightThemeClassName, FluentProvider } from '@fluentui/react-components';

export const FluentWapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <FluentProvider themeClassName={teamsLightThemeClassName}>{children}</FluentProvider>;
};
