import * as React from 'react';
import type { RegisterPortalFn } from './types';

const PortalCompatContext = React.createContext<RegisterPortalFn>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => () => {},
);

export const PortalCompatContextProvider = PortalCompatContext.Provider;

export function usePortalCompat() {
  return React.useContext(PortalCompatContext);
}
