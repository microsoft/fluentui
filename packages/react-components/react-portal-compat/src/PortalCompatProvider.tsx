'use client';

import * as React from 'react';
import { fluentProviderClassNames, useThemeClassName } from '@fluentui/react-components';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';
import { applyFocusVisiblePolyfill } from '@fluentui/react-tabster';

import type { RegisterPortalFn } from '@fluentui/react-portal-compat-context';

/**
 * Extracts the RUNTIME theme classes — `fui-FluentProvider<useId>` — out of the
 * `themeClassName` context value, so they can be re-applied to v8 portal elements.
 *
 * Unaffected by the BEM statics removal
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md` D16.1), and the `\w+` is why: the
 * pattern requires at least one word character AFTER the seed, so it only ever matched the
 * `useId`-suffixed runtime class and never the bare `fui-FluentProvider` static that D16.1
 * stopped rendering. `fluentProviderClassNames.root` is retained precisely as this seed
 * (see its JSDoc in react-provider) — do not "modernise" it to the group marker, which is
 * lowercase and slash-bearing and would make this pattern match nothing.
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated -- the deprecation is about STYLING use. This is the constant's retained non-styling role: it seeds the runtime `fui-FluentProvider<useId>` theme class (DECISIONS.md D16.1/D16.5).
const CLASS_NAME_REGEX = new RegExp(`([^\\s]*${fluentProviderClassNames.root}\\w+)`, 'g');

export function useProviderThemeClasses(): string[] {
  const themeClassName = useThemeClassName();
  const cssVariablesClasses = React.useMemo<string[]>(
    // "themeClassName" may contain multiple classes while we want to add only classes that host CSS variables
    // Keep in sync with "packages/react-provider/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts"
    () => themeClassName.match(CLASS_NAME_REGEX) ?? [],
    [themeClassName],
  );

  if (process.env.NODE_ENV !== 'production') {
    // This if statement technically breaks the rules of hooks, but ENV variables never change during app lifecycle
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (themeClassName === '') {
        // eslint-disable-next-line no-console
        console.warn(`
          PortalCompatProvider: "useThemeClassName()" hook returned an empty string
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

      element.classList.add(...cssVariablesClasses);
      if (element.ownerDocument.defaultView) {
        disposeFocusVisiblePolyfill = applyFocusVisiblePolyfill(element, element.ownerDocument.defaultView);
      }

      return () => {
        element.classList.remove(...cssVariablesClasses);
        disposeFocusVisiblePolyfill();
      };
    },
    [cssVariablesClasses],
  );

  return <PortalCompatContextProvider value={registerPortalEl}>{children}</PortalCompatContextProvider>;
};
