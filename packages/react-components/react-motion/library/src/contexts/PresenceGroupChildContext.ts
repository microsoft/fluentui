import * as React from 'react';

export type PresenceGroupChildContextValue = {
  appear: boolean;
  visible: boolean;
  unmountOnExit: boolean;

  onExit: () => void;
};

/**
 * @internal
 */
export const PresenceGroupChildContext = React.createContext<PresenceGroupChildContextValue | undefined>(undefined);

export const PresenceGroupChildProvider = PresenceGroupChildContext.Provider;
export const usePresenceGroupChildContext = (): PresenceGroupChildContextValue | undefined =>
  React.useContext(PresenceGroupChildContext);
