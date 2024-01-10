import * as React from 'react';

/**
 * @internal
 */
export type BackgroundAppearanceContextValue = 'inverted' | undefined;

/**
 * @internal
 */
export const BackgroundAppearanceContext = React.createContext<BackgroundAppearanceContextValue | undefined>(undefined);

/**
 * @internal
 */
export const BackgroundAppearanceProvider = BackgroundAppearanceContext.Provider;

export function useBackgroundAppearance(): BackgroundAppearanceContextValue {
  return React.useContext(BackgroundAppearanceContext);
}
