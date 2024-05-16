import * as React from 'react';

import { PresenceGroupChildContext } from '../contexts/PresenceGroupChildContext';
import type { PresenceGroupChildContextValue } from '../contexts/PresenceGroupChildContext';

type PresenceGroupItemProviderProps = Omit<PresenceGroupChildContextValue, 'onExit'> & {
  children: React.ReactElement;
  childKey: string;
  // That's an internal callback, so we don't need to enforce the type here
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onExit: (childKey: string) => void;
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
