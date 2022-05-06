import * as React from 'react';
import { fluentProviderClassNames, useThemeClassName } from '@fluentui/react-components';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';

import type { RegisterPortalFn } from '@fluentui/react-portal-compat-context';

const CLASS_NAME_REGEX = new RegExp(`(${fluentProviderClassNames.root}\\d+)`);

export const PortalCompatProvider: React.FC = props => {
  const { children } = props;

  const themeClassName = useThemeClassName();
  const cssVariablesClassName = React.useMemo<string | undefined>(
    // "themeClassName" may contain multiple classes while we want to add only a class that hosts CSS variables
    // Keep in sync with "packages/react-provider/src/components/FluentProvider/useFluentProviderThemeStyleTag.ts"
    () => themeClassName.match(CLASS_NAME_REGEX)?.[1],
    [themeClassName],
  );

  const registerPortalEl = React.useCallback<RegisterPortalFn>(
    element => {
      if (cssVariablesClassName) {
        element.classList.add(cssVariablesClassName);
      }

      return () => {
        if (cssVariablesClassName) {
          element.classList.remove(cssVariablesClassName);
        }
      };
    },
    [cssVariablesClassName],
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

  return <PortalCompatContextProvider value={registerPortalEl}>{children}</PortalCompatContextProvider>;
};
