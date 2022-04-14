import * as React from 'react';
import { RegisterPortalFn } from './types';

export const PortalCompatContext = React.createContext<RegisterPortalFn>(() => () => {});

export function usePortalCompat() {
  return React.useContext(PortalCompatContext);
}
