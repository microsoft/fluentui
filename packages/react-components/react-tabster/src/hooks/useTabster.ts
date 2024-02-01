import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createTabster, disposeTabster, Types as TabsterTypes } from 'tabster';
import { useIsomorphicLayoutEffect, getParent } from '@fluentui/react-utilities';

interface WindowWithTabsterShadowDOMAPI extends Window {
  __tabsterShadowDOMAPI?: TabsterTypes.DOMAPI;
}

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

  const shadowDOMAPI = (defaultView as WindowWithTabsterShadowDOMAPI | undefined)?.__tabsterShadowDOMAPI;

  const tabster = React.useMemo(() => {
    if (!defaultView) {
      return null;
    }

    return createTabster(defaultView, {
      autoRoot: {},
      controlTab: false,
      getParent,
      checkUncontrolledTrappingFocus: element =>
        !!element.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper'),
      DOMAPI: shadowDOMAPI,
    });
  }, [defaultView, shadowDOMAPI]);

  useIsomorphicLayoutEffect(() => {
    return () => {
      if (tabster) {
        disposeTabster(tabster);
      }
    };
  }, [tabster]);

  return tabster;
};
