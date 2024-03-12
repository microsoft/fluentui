import * as React from 'react';
import { contexts } from 'react-strict-dom';
import { type XPlatProviderProps } from './XPlatProvider.types';
import { createCustomVariablesFromTheme } from './createCustomVariablesFromTheme';

// css variables insertion should be suppressed in native
export const suppressCssVariableInsertion = true;

export const XPlatProvider: React.FunctionComponent<XPlatProviderProps> = props => {
  const { theme, children } = props;
  const customProps = React.useMemo(() => createCustomVariablesFromTheme(theme), [theme]);

  // customProperties should be in the form of { '--camelCasedVariable': 'value' }
  return <contexts.ThemeProvider customProperties={customProps} children={children} />;
};
