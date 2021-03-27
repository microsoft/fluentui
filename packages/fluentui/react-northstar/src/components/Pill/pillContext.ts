import { createContext } from '@fluentui/react-bindings';
import { AriaRole } from '@fluentui/accessibility';

export type PillsContextValue = {
  role: AriaRole;
};

export type PillSubscribedValue = Pick<PillsContextValue, 'role'>;

export const PillContext = createContext<PillsContextValue>({
  role: 'none',
});

export const PillsContextProvider = PillContext.Provider;
