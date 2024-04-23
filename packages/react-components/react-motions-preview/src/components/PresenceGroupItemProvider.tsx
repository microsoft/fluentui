import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import type { PresenceGroupChildContextValue } from '../contexts/PresenceGroupChildContext';

type PresenceGroupItemProviderProps = PresenceGroupChildContextValue & {
  children: React.ReactElement;
  childKey: string;
};

/**
 * @internal
 *
 * Provides context for a single child of a `PresenceGroup`. Exists only to make a stable context value for a child.
 * Not intended for direct use.
 */
export const PresenceGroupItemProvider: React.FC<PresenceGroupItemProviderProps> = props => {
  const { appear, childKey, onExit, visible, unmountOnExit } = props;
  const contextValue = React.useMemo(
    () => ({
      appear,
      visible,
      onExit: () => onExit(childKey),
      unmountOnExit,
    }),
    [appear, childKey, onExit, visible, unmountOnExit],
  );

  return <PresenceGroupChildContext.Provider value={contextValue}>{props.children}</PresenceGroupChildContext.Provider>;
};
