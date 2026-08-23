import type * as React from 'react';
import type { ThemeClassName } from '@fluentui/react-tailwind-theme-preview/theme-class-names';

export type { ThemeClassName };

export type FluentProviderProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * Theme class to apply to the subtree — one of the constants re-exported from this
   * package's `/fluent-provider` entry (e.g. `webDarkThemeClassName`). Omit it for the default
   * web-light values, which are emitted at `:root, :host` by the theme stylesheet.
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
