import * as React from 'react';
import { type XPlatProviderProps } from './XPlatProvider.types';

// css variables should be inserted as usual for web
export const suppressCssVariableInsertion = false;

/**
 * XPlatProvider is effectively a no-op for web scenarios
 */
export const XPlatProvider: React.FunctionComponent<XPlatProviderProps> = props => {
  const { children } = props;
  return <>{children}</>;
};
