'use client';

import type { TabsterDOMAttribute } from './useTabsterAttributes';

/**
 * Designates an area where tabster does not control focus.
 *
 * In tabster/lite there is no global focus manager to opt out of, so this
 * hook returns an empty attribute object and is effectively a no-op.
 * TODO: add uncontrolled support to tabster/lite if needed.
 */
export function useUncontrolledFocus(): TabsterDOMAttribute {
  return {};
}
