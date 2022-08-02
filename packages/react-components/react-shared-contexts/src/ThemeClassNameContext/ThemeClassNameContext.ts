import * as React from 'react';

export type ThemeClassNameContextValue = string;

/**
 * @internal
 * Used to provide a CSS class that applies theme css variables
 *
 * Useful for elements in the React tree (can read context) but not in the DOM Tree. E.g. Portals
 */
// eslint-disable-next-line @fluentui/no-context-default-value
const ThemeClassNameContext = React.createContext<ThemeClassNameContextValue>('');

export const ThemeClassNameProvider = ThemeClassNameContext.Provider;

/**
 * @internal
 * @returns CSS class that applies css variables
 */
export function useThemeClassName(): ThemeClassNameContextValue {
  return React.useContext(ThemeClassNameContext);
}
