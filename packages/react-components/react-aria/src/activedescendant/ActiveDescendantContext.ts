import * as React from 'react';
import { ActiveDescendantImperativeRef } from './types';

export type ActiveDescendantContextValue = {
  imperativeRef: React.RefObject<ActiveDescendantImperativeRef>;
};

const activeDescendantContextDefaultValue: ActiveDescendantContextValue = {
  imperativeRef: React.createRef(),
};

const ActiveDescendantContext = React.createContext<ActiveDescendantContextValue | undefined>(undefined);

export const ActiveDescendantContextProvider = ActiveDescendantContext.Provider;
export const useActiveDescendantContext = () =>
  React.useContext(ActiveDescendantContext) ?? activeDescendantContextDefaultValue;
