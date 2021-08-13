import * as React from 'react';
import { ProviderContextValue } from './ProviderContext.types';

export const ProviderContext = React.createContext<ProviderContextValue>({
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: document.dir as 'ltr' | 'rtl',
});

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}
