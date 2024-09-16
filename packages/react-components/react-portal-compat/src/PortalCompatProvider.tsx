import * as React from 'react';
import { fluentProviderClassNames, useThemeClassName } from '@fluentui/react-components';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';
import { applyFocusVisiblePolyfill } from '@fluentui/react-tabster';

import type { RegisterPortalFn } from '@fluentui/react-portal-compat-context';

const CLASS_NAME_REGEX = new RegExp(`([^\\s]*${fluentProviderClassNames.root}\\w+)`, 'g');

export function useProviderThemeClasses(): string[] {
  'use no memo';

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
