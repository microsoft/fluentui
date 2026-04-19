'use client';

import { RestorerTypes } from 'tabster/lite/restorer';
import type { TabsterDOMAttribute } from './useTabsterAttributes';
import { useTabsterAttributes } from './useTabsterAttributes';

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the target element where focus is restored
 */
export function useRestoreFocusTarget(): TabsterDOMAttribute {
  return useTabsterAttributes({ restorer: { type: RestorerTypes.Target } });
}

/**
 * Focus will be restored to the most recent target element when it is lost from a source
 * @returns Attribute to apply to the element that might lose focus
 */
export function useRestoreFocusSource(): TabsterDOMAttribute {
  return useTabsterAttributes({ restorer: { type: RestorerTypes.Source } });
}
