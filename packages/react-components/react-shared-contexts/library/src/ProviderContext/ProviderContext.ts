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
const ProviderContext = React.createContext<ProviderContextValue | undefined>(
  undefined,
) as React.Context<ProviderContextValue>;

const providerContextDefaultValue: ProviderContextValue = {
  // eslint-disable-next-line no-restricted-globals
  targetDocument: typeof document === 'object' ? document : undefined,
  dir: 'ltr' as const,
};

/**
 * @internal
 */
export const Provider = ProviderContext.Provider;

export function useFluent(): ProviderContextValue {
  return React.useContext(ProviderContext) ?? providerContextDefaultValue;
}
