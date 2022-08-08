import * as React from 'react';
import type { RegisterPortalFn } from './types';

const PortalCompatContext = React.createContext<RegisterPortalFn | undefined>(undefined);

const portalCompatContextDefaultValue = () => () => {};

export const PortalCompatContextProvider = PortalCompatContext.Provider;

export function usePortalCompat() {
  return React.useContext(PortalCompatContext) ?? portalCompatContextDefaultValue;
}
