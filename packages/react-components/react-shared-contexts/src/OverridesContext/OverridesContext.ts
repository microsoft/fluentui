import * as React from 'react';

/**
 * @internal
 */
export type OverridesContextValue = {
  // No 'underline' as it is not supported by TextArea
  inputDefaultAppearance?: 'outline' | 'filled-darker' | 'filled-lighter';
};

/**
 * @internal
 */
export const OverridesContext = React.createContext<OverridesContextValue | undefined>(undefined);

/**
 * @internal
 */
export const OverridesProvider = OverridesContext.Provider;

export function useOverrides(): OverridesContextValue {
  return React.useContext(OverridesContext) ?? {};
}
