import * as React from 'react';

import { DrawerScrollState } from '../shared/DrawerBase.types';

export type DrawerContextValue = {
  scrollState: DrawerScrollState;
  setScrollState: (scrollState: DrawerScrollState) => void;
};

const defaultContextValue: DrawerContextValue = {
  scrollState: 'none',
  setScrollState: () => ({}),
};

export const drawerContext = React.createContext<DrawerContextValue | undefined>(undefined);
export const DrawerProvider = drawerContext.Provider;
export const useDrawerContext_unstable = () => React.useContext(drawerContext) ?? defaultContextValue;

export const useDrawerContextValue = (): DrawerContextValue => {
  const [scrollState, setScrollState] = React.useState<DrawerScrollState>('none');

  return {
    setScrollState,
    scrollState,
  };
};
