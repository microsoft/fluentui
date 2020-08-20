import { Theme, PartialTheme } from './types';

/**
 * Props for the ThemeProvider component.
 */
export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Defines the theme provided by the user.
   */
  theme?: PartialTheme | Theme;

  /**
   * Apply appropriate styling to the element, to body, or to none. This includes,
   * but is not limited to, default fonts and colors. Defaults to the ThemeProvider
   * element (`element`).
   */
  // applyTo?: 'none' | 'element' | 'body';

  /**
   * Targets styling to be injected into a particular window.
   */
  // targetWindow?: Window | null;

  /**
   * Allows the style rendering to be overridden to use your css in js mechanism
   * of choice.
   */
  styleRenderer?: <TStyleSet>(styleSet: TStyleSet) => { [key in keyof TStyleSet]: string };
}
