import * as React from 'react';

export type ThemeClassNameContextValue = string;

/**
 * Used to provide a CSS class that applies theme css variables
 *
 * Useful for elements in the React tree (can read context) but not in the DOM Tree. E.g. Portals
 */
const ThemeClassNameContext = React.createContext<ThemeClassNameContextValue>('');

export const { Provider: ThemeClassNameProvider } = ThemeClassNameContext;

/**
 * @returns CSS class that applies css variables
 */
export function useThemeClassName(): ThemeClassNameContextValue {
  return React.useContext(ThemeClassNameContext);
}
