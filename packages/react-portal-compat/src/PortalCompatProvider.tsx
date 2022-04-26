import * as React from 'react';
import { useThemeClassName } from '@fluentui/react-components';
import { PortalCompatContextProvider } from '@fluentui/react-portal-compat-context';

import type { RegisterPortalFn } from '@fluentui/react-portal-compat-context';

export const PortalCompatProvider: React.FC = props => {
  const { children } = props;

  const themeClassName = useThemeClassName();
  const cssVariablesClassName = React.useMemo<string | undefined>(
    // "themeClassName" may contain multiple classes while we want to add only a class that hosts CSS variables
    // Keep in sync with "packages/react-provider/src/components/FluentProvider/useThemeStyleTag.ts"
    () => themeClassName.match(/(fui-FluentProvider\d+)/)?.[1],
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

  return <PortalCompatContextProvider value={registerPortalEl}>{children}</PortalCompatContextProvider>;
};
