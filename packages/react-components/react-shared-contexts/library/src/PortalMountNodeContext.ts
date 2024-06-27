import * as React from 'react';

export type PortalMountNodeContextValue = HTMLElement | ShadowRoot | undefined;

/**
 * Provides a mount node for portals to render into.
 *
 * @internal
 */
const PortalMountNodeContext = React.createContext<PortalMountNodeContextValue>(undefined);

/**
 * @internal
 */
export const PortalMountNodeProvider = PortalMountNodeContext.Provider;

export function usePortalMountNode(): PortalMountNodeContextValue {
  return React.useContext(PortalMountNodeContext);
}
