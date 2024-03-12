import * as React from 'react';
import { contexts } from 'react-strict-dom';
import { type XPlatProviderProps } from './XPlatProvider.types';

export const XPlatProvider: React.FunctionComponent<XPlatProviderProps> = props => {
  const { theme, children } = props;
  return <contexts.ThemeProvider customProperties={theme} children={children} />;
};
