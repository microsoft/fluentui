'use client';

import * as React from 'react';
import { useFluentProviderThemeClassName_unstable } from '@fluentui/react-components';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';
import { applyFocusVisiblePolyfill } from '@fluentui/react-tabster';

import type { RegisterPortalFn } from '@fluentui/react-portal-compat-context';

/**
 * Returns the class(es) that host the theme's CSS variables, to be re-applied to v8
 * portal elements.
 *
 * Theming Phase 2b: themes are static CSS classes (`fui-theme-web-dark`, …, or a
 * consumer-authored class) resolved by FluentProvider from its `themeClassName` prop /
 * inheritance — read here via `useFluentProviderThemeClassName_unstable`. This replaces
 * the pre-2b regex extraction of the runtime `fui-FluentProvider<useId>` class out of the
 * `useThemeClassName()` string. The full `useThemeClassName()` value is deliberately NOT
 * used: it (by default) carries the provider's typography/color base classes, which would
 * restyle v8 surfaces — only the custom-property-hosting theme class belongs on v8
 * portals.
 */
export function useProviderThemeClasses(): string[] {
  const themeClassName = useFluentProviderThemeClassName_unstable();
  const cssVariablesClasses = React.useMemo<string[]>(
    // The resolved theme class may legitimately be '' (no theme class — the :root
    // web-light defaults apply, which v8 portals inherit without any class).
    () => (themeClassName ? themeClassName.split(' ').filter(Boolean) : []),
    [themeClassName],
  );

  if (process.env.NODE_ENV !== 'production') {
    // This if statement technically breaks the rules of hooks, but ENV variables never change during app lifecycle
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (themeClassName === undefined) {
        // eslint-disable-next-line no-console
        console.warn(`
          PortalCompatProvider: no FluentProvider was found above in the React tree
          =============================================
          Make sure that PortalCompatProvider is rendered inside FluentProvider as a child.
      `);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return cssVariablesClasses;
}

export const PortalCompatProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const { children } = props;
  const cssVariablesClasses = useProviderThemeClasses();

  const registerPortalEl = React.useCallback<RegisterPortalFn>(
    element => {
      let disposeFocusVisiblePolyfill: () => void = () => undefined;

      if (cssVariablesClasses.length > 0) {
        element.classList.add(...cssVariablesClasses);
      }
      if (element.ownerDocument.defaultView) {
        disposeFocusVisiblePolyfill = applyFocusVisiblePolyfill(element, element.ownerDocument.defaultView);
      }

      return () => {
        if (cssVariablesClasses.length > 0) {
          element.classList.remove(...cssVariablesClasses);
        }
        disposeFocusVisiblePolyfill();
      };
    },
    [cssVariablesClasses],
  );

  return <PortalCompatContextProvider value={registerPortalEl}>{children}</PortalCompatContextProvider>;
};
