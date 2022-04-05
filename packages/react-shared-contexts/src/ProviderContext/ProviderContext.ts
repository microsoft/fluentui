import * as React from 'react';
import type { ProviderContextValue } from './ProviderContext.types';

export const ProviderContext = React.createContext<ProviderContextValue>({
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}
