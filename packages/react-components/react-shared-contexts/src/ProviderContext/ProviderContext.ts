import * as React from 'react';

export type ProviderContextValue = {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;
};

const ProviderContext = React.createContext<ProviderContextValue>({
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

export const { Provider } = ProviderContext;

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}
