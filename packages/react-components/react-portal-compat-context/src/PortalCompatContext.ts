import * as React from 'react';
import type { RegisterPortalFn } from './types';

const PortalCompatContext = React.createContext<RegisterPortalFn>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @fluentui/no-context-default-value
  () => () => {},
);

export const PortalCompatContextProvider = PortalCompatContext.Provider;

export function usePortalCompat() {
  return React.useContext(PortalCompatContext);
}
