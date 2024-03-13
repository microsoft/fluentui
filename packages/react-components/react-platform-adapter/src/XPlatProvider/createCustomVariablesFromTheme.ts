import { PartialTheme } from '@fluentui/react-theme';

/**
 * Formats the theme tokens into the right form to be inserted into the react-strict-dom ThemeProvider.
 */
export function createCustomVariablesFromTheme(theme: PartialTheme | undefined): { [key: string]: string } {
  if (theme) {
    return (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVars, cssVar) => {
      return { ...cssVars, [`--${cssVar}`]: theme[cssVar] };
    }, {});
  }

  return {};
}
