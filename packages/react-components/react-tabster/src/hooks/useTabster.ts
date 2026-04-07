'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect, usePrevious } from '@fluentui/react-utilities';
import {
  createNavigationManager,
  disposeNavigationManager,
  type NavigationManager,
} from '../focus-navigation/navigationManager';

type UseTabsterFactory<FactoryResult> = (manager: NavigationManager) => FactoryResult;

const DEFAULT_FACTORY: UseTabsterFactory<NavigationManager> = manager => manager;

/**
 * Creates (or reuses) the NavigationManager for the current document.
 *
 * @internal
 */
export function useTabster(): React.RefObject<NavigationManager | null>;
export function useTabster<FactoryResult>(
  factory: UseTabsterFactory<FactoryResult>,
): React.RefObject<FactoryResult | null>;

export function useTabster<FactoryResult>(factory = DEFAULT_FACTORY): React.RefObject<FactoryResult | null> {
  const { targetDocument } = useFluent();
  const factoryResultRef = React.useRef<FactoryResult | null>(null);

  useIsomorphicLayoutEffect(() => {
    const doc = targetDocument;
    if (!doc) {
      return;
    }

    const manager = createNavigationManager(doc);
    factoryResultRef.current = factory(manager) as FactoryResult;

    return () => {
      disposeNavigationManager(manager);
      factoryResultRef.current = null;
    };
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
