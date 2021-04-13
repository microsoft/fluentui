import * as React from 'react';

/**
 * Used to provide a CSS class that applies theme css variables
 *
 * Useful for elements in the React tree (can read context) but not in the DOM Tree. E.g. Portals
 */
export const ThemeClassNameContext = React.createContext('');

/**
 * @returns CSS class that applies css variables
 */
export function useThemeClassName(): string {
  return React.useContext(ThemeClassNameContext);
}
