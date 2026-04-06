'use client';

import { type TabsterDOMAttribute } from '../focus-navigation/types';
import { useTabsterAttributes } from './useTabsterAttributes';

/**
 * Marks an element as "observed" under one or more names so that
 * `useFocusObserved` can focus it by name.
 *
 * The NavigationManager's MutationObserver picks up the `data-tabster`
 * attribute and registers the element in the observed-element map automatically.
 */
export function useObservedElement(name: string | string[]): TabsterDOMAttribute {
  const names = Array.isArray(name) ? name : [name];
  return useTabsterAttributes({ observed: { names } });
}
