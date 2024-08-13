import { getTabsterAttribute, Types as TabsterTypes } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Designates an area where tabster does not control focus
 * @returns Attribute to apply to the target element that should be uncontrolled by tabster
 */
export function useUncontrolledFocus(): TabsterTypes.TabsterDOMAttribute {
  useTabster();

  return getTabsterAttribute({ uncontrolled: {} });
}
