import type * as React from 'react';
import type { ThemeClassName } from '@fluentui/react-tailwind-theme-preview/theme-class-names';

export type { ThemeClassName };

export type FluentProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Theme class to apply to the subtree — one of the constants re-exported from this
   * package's `/provider` entry (e.g. `webDarkThemeClassName`).
   *
   * THERE IS NO DEFAULT THEME. The theme stylesheet bakes none, mirroring Griffel, where a
   * provider given no theme object leaves every token unset. Omit this prop only when an
   * ancestor already carries a theme class — an outer provider, or the application's root
   * element — since custom properties cascade into the subtree. Otherwise import the theme's
   * CSS file (`@fluentui/react-tailwind-theme-preview/themes/web-light.css`) and pass its
   * class; a development-only check warns when neither happened.
   *
   * Typed as the shipped union but open to any string so consumer-authored theme classes
   * (same custom-property contract) work too.
   */
  theme?: ThemeClassName | (string & {});

  /** Text direction for the subtree — stamped on the rendered element and provided to
   *  headless components via context. Defaults to the enclosing provider's direction. */
  dir?: 'ltr' | 'rtl';

  /** The document, for components that need it (portals-free, but e.g. event listeners). */
  targetDocument?: Document;
};
