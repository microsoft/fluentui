import * as React from 'react';
import { AriaRole } from '@fluentui/accessibility';

export type PillsContextValue = {
  role: AriaRole;
};

export const PillContext = React.createContext<PillsContextValue>({
  role: 'none',
});

export const PillsContextProvider = PillContext.Provider;

export const usePillContext = () => React.useContext(PillContext);
