import * as React from 'react';
import type { RegisterPortalFn } from './types';

const PortalCompatContext = React.createContext<RegisterPortalFn | undefined>(
  undefined,
) as React.Context<RegisterPortalFn>;

const portalCompatContextDefaultValue = () => () => undefined;

export const PortalCompatContextProvider = PortalCompatContext.Provider;

export function usePortalCompat() {
  return React.useContext(PortalCompatContext) ?? portalCompatContextDefaultValue;
}
