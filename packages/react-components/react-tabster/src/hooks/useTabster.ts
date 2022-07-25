import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect, useFirstMount } from '@fluentui/react-utilities';
import { createTabster as createTabsterBase, disposeTabster, Types as TabsterTypes } from 'tabster';

const createTabster = (win: Window | undefined) => {
  if (!win) {
    return null;
  }

  return createTabsterBase(win, { autoRoot: {}, controlTab: false });
};

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * Since Tabster is single instance only, feel free to call this hook to ensure Tabster exists if necessary
 *
 * @internal
 * @returns Tabster core instance
 */
export const useTabster = (): TabsterTypes.TabsterCore | null => {
  const { targetDocument } = useFluent();
  const firstMount = useFirstMount();

  const defaultView = targetDocument?.defaultView || undefined;
  const [tabster, setTabster] = React.useState(() => createTabster(defaultView));

  useIsomorphicLayoutEffect(() => {
    if (!firstMount) {
      setTabster(createTabster(defaultView));
    }

    return () => {
      if (tabster) {
        disposeTabster(tabster);
      }
    };
  }, [tabster]);

  return tabster;
};
