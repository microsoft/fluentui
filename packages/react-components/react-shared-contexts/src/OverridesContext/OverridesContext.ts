import * as React from 'react';

/**
 * @internal
 */
export type OverridesContextValue = {
  // should be InputProps['appearance'], but do we want to add the dependency?
  inputDefaultAppearance?: 'outline' | 'underline' | 'filled-darker' | 'filled-lighter';
};

/**
 * @internal
 */
export const OverridesContext = React.createContext<OverridesContextValue | undefined>(undefined);
OverridesContext.displayName = 'OverridesContext';

/**
 * @internal
 */
export const OverridesProvider = OverridesContext.Provider;

export function useOverrides(): OverridesContextValue {
  return React.useContext(OverridesContext) ?? {};
}
