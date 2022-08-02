import * as React from 'react';

export type ProviderContextValue = {
  /** Sets the direction of text & generated styles. */
  dir: 'ltr' | 'rtl';

  /** Provides the document, can be undefined during SSR render. */
  targetDocument?: Document;
};

/**
 * @internal
 */
// eslint-disable-next-line @fluentui/no-context-default-value
const ProviderContext = React.createContext<ProviderContextValue>({
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: 'ltr',
});

/**
 * @internal
 */
export const Provider = ProviderContext.Provider;

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext);
}
