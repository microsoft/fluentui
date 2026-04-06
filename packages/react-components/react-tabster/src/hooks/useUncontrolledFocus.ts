'use client';

import { type TabsterDOMAttribute } from '../focus-navigation/types';
import { useTabsterAttributes } from './useTabsterAttributes';

/**
 * Designates an area where the NavigationManager does not control focus.
 * @returns Attribute to apply to the target element that should be uncontrolled
 */
export function useUncontrolledFocus(): TabsterDOMAttribute {
  return useTabsterAttributes({ uncontrolled: {} });
}
