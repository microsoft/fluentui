import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createTabster, disposeTabster, Types as TabsterTypes } from 'tabster';

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * Since Tabster is single instance only, feel free to call this hook to ensure Tabster exists if necessary
 *
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = (): TabsterTypes.TabsterCore | null => {
  const { targetDocument } = useFluent();

  const defaultView = targetDocument?.defaultView || undefined;

  const tabster = React.useMemo(() => {
    if (defaultView) {
      return createTabster(defaultView, { autoRoot: {}, controlTab: false });
    }

    return null;
  }, []);

  React.useEffect(() => {
    return () => {
      if (tabster) {
        disposeTabster(tabster);
      }
    };
  }, [tabster]);

  return tabster;
};
