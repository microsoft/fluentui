import { createContext, useContextSelector, ContextSelector } from '@fluentui/react-context-selector';
import type { FieldContextValue } from '../Field';

export const FieldContext = createContext<FieldContextValue | undefined>(undefined);

export const FieldProvider = FieldContext.Provider;

export const useFieldContext = <T>(selector: ContextSelector<FieldContextValue | undefined, T>): T => {
  return useContextSelector(FieldContext, selector);
};
