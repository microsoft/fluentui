'use client';

import * as React from 'react';

/**
 * Carries the RESOLVED theme class name of the closest FluentProvider (theming Phase 2b).
 *
 * Since the removal of the runtime theme style tag, a theme is a static CSS class
 * (`webDarkThemeClassName` → `.fui-theme-web-dark`, shipped by
 * `@fluentui/react-tailwind-theme`) containing only custom-property declarations; the
 * provider applies it to its root and this context propagates it down. Two consumers:
 *
 * - nested FluentProviders default their `themeClassName` prop to the inherited value —
 *   without this, a portal opened from inside an unthemed nested provider would lose the
 *   ancestor's theme (the portal element escapes the DOM subtree the class cascades to);
 * - `@fluentui/react-portal-compat` applies exactly this class to v8 portal elements. It
 *   must NOT receive the provider's full root class string (the
 *   `ThemeClassNameContext_unstable` value used for v9 portals), which carries the
 *   provider's typography/color base classes and would restyle v8 surfaces.
 *
 * Replaces the pre-2b mechanisms: the runtime `fui-FluentProvider<useId>` class minted by
 * `useFluentProviderThemeStyleTag` (nested providers re-emitted a full merged theme rule
 * instead of inheriting) and portal-compat's `fui-FluentProvider\w+` regex extraction.
 */
const FluentProviderThemeClassNameContext = React.createContext<string | undefined>(undefined);

/**
 * @internal
 */
export const FluentProviderThemeClassNameProvider = FluentProviderThemeClassNameContext.Provider;

/**
 * Returns the resolved theme class name of the closest FluentProvider: its
 * `themeClassName` prop if set, otherwise the value inherited from its parent provider.
 * `''` when the closest provider has no theme class (the static web-light defaults at
 * `:root` apply); `undefined` when there is no FluentProvider above at all.
 *
 * @internal
 */
export function useFluentProviderThemeClassName_unstable(): string | undefined {
  return React.useContext(FluentProviderThemeClassNameContext);
}
