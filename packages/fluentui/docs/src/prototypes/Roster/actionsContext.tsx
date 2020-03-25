import * as React from 'react';

export interface IActionsContext {
  promote: (id: string) => void;
  demote: (id: string) => void;
  mute: (id: string) => void;
  unmute: (id: string) => void;
}

export const ActionsContext = React.createContext<IActionsContext>(undefined);

export const useActions = () => React.useContext(ActionsContext);
