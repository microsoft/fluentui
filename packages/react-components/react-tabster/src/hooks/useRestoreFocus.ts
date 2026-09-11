'use client';

import type { Types as TabsterTypes } from 'tabster';
import * as tabsterModule from 'tabster';
import { useTabster } from './useTabster';

const tabster = (tabsterModule as typeof tabsterModule & { default?: typeof tabsterModule }).default ?? tabsterModule;
const { getRestorer, getTabsterAttribute, RestorerTypes } = tabster;

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the target element where focus is restored
 */
export function useRestoreFocusTarget(): TabsterTypes.TabsterDOMAttribute {
  // Initializes the restorer API
  useTabster(getRestorer);

  return getTabsterAttribute({ restorer: { type: RestorerTypes.Target } });
}

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the element that might lose focus
 */
export function useRestoreFocusSource(): TabsterTypes.TabsterDOMAttribute {
  // Initializes the restorer API
  useTabster(getRestorer);

  return getTabsterAttribute({ restorer: { type: RestorerTypes.Source } });
}
