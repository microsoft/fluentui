import * as React from 'react';
import { ProviderContextValue } from './ProviderContext.types';

export const ProviderContext = React.createContext<ProviderContextValue>({
  document: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}
