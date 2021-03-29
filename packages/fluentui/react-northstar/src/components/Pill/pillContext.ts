import * as React from 'react';
import { Accessibility } from '@fluentui/accessibility';

export type PillsContextValue = {
  pillBehavior: Accessibility;
};

export const PillContext = React.createContext<PillsContextValue>({
  pillBehavior: null,
});

export const PillsContextProvider = PillContext.Provider;

export const usePillContext = () => React.useContext(PillContext);
