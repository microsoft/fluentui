import * as React from 'react';

export interface IActionsContext {
  togglePromote: (id: string, type: string) => void;
  toggleMute: (id: string, type: string) => void;
}

export const ActionsContext = React.createContext<IActionsContext>(undefined);

export const useActions = () => React.useContext(ActionsContext);
