'use client';

import type { Types as TabsterTypes } from 'tabster';
import * as tabsterModule from 'tabster';
import { useTabster } from './useTabster';

const tabster = (tabsterModule as typeof tabsterModule & { default?: typeof tabsterModule }).default ?? tabsterModule;
const { getTabsterAttribute } = tabster;

/**
 * Designates an area where tabster does not control focus
 * @returns Attribute to apply to the target element that should be uncontrolled by tabster
 */
export function useUncontrolledFocus(): TabsterTypes.TabsterDOMAttribute {
  useTabster();

  return getTabsterAttribute({ uncontrolled: {} });
}
