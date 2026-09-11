'use client';

import * as React from 'react';
import type { Types as TabsterTypes } from 'tabster';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { getParent, useIsomorphicLayoutEffect, usePrevious } from '@fluentui/react-utilities';
import { tabster } from '../tabsterCompat';

const { createTabster, disposeTabster } = tabster;

interface WindowWithTabsterShadowDOMAPI extends Window {
  __tabsterShadowDOMAPI?: TabsterTypes.DOMAPI;
}

type UseTabsterFactory<FactoryResult> = (tabsterInstance: TabsterTypes.TabsterCore) => FactoryResult;

const DEFAULT_FACTORY: UseTabsterFactory<TabsterTypes.TabsterCore> = tabsterInstance => {
  return tabsterInstance;
};

/**
 * Creates a tabster instance with the provided configuration
 *
 * @internal
 * @param targetDocument
 */
export function createTabsterWithConfig(targetDocument: Document | undefined): TabsterTypes.TabsterCore | undefined {
  const defaultView = targetDocument?.defaultView || undefined;
  const shadowDOMAPI = (defaultView as WindowWithTabsterShadowDOMAPI | undefined)?.__tabsterShadowDOMAPI;

  if (defaultView) {
    return createTabster(defaultView, {
      autoRoot: {},
      controlTab: false,
      getParent,
      // The non-undefined return value of checkUncontrolledCompletely() dominates the value that the element might
      // have in its `uncontrolled: { completely: true }` part of the tabster attribute. We must make sure to return
      // undefined if we want the value from tabster attribute to be respected.
      checkUncontrolledCompletely: element =>
        element.firstElementChild?.hasAttribute('data-is-focus-trap-zone-bumper') === true || undefined,
      DOMAPI: shadowDOMAPI,
    });
  }
}

/**
 * Tries to get a tabster instance on the current window or creates a new one
 * Since Tabster is single instance only, feel free to call this hook to ensure Tabster exists if necessary
 *
 * @internal
 * @returns Tabster a ref to core instance or a factory result
 */
export function useTabster(): React.RefObject<TabsterTypes.TabsterCore | null>;
export function useTabster<FactoryResult>(
  factory: UseTabsterFactory<FactoryResult>,
): React.RefObject<FactoryResult | null>;

export function useTabster<FactoryResult>(factory = DEFAULT_FACTORY): React.RefObject<FactoryResult | null> {
  const { targetDocument } = useFluent();
  const factoryResultRef = React.useRef<FactoryResult | null>(null);

  useIsomorphicLayoutEffect(() => {
    const tabsterInstance = createTabsterWithConfig(targetDocument);

    if (tabsterInstance) {
      factoryResultRef.current = factory(tabsterInstance) as FactoryResult;

      return () => {
        disposeTabster(tabsterInstance);
        factoryResultRef.current = null;
      };
    }
  }, [targetDocument, factory]);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line
    const previousFactory = usePrevious(factory);

    if (previousFactory !== null && previousFactory !== factory) {
      throw new Error(
        [
          '@fluentui/react-tabster: ',
          'The factory function passed to useTabster has changed. This should not ever happen.',
        ].join('\n'),
      );
    }
  }

  return factoryResultRef;
}
