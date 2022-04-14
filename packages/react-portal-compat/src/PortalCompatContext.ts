import * as React from 'react';
import { RegisterPortalFn } from './types';

export const PortalCompatContext = React.createContext<RegisterPortalFn>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => () => {},
);

export function usePortalCompat() {
  return React.useContext(PortalCompatContext);
}
