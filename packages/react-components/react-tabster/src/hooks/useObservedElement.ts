'use client';

import * as React from 'react';
import type { TabsterDOMAttribute } from './useTabsterAttributes';

/**
 * Returns a DOM attribute that marks this element as observable by name.
 * Uses data-tabster-lite-observed, which tabster/lite/observed watches.
 *
 * Multiple names are stored as a space-separated token list so that
 * tabster/lite/observed can find the element by any of the provided names.
 */
export function useObservedElement(name: string | string[]): TabsterDOMAttribute {
  const observedValue = Array.isArray(name) ? name.join(' ') : name;

  return React.useMemo(() => ({ 'data-tabster-lite-observed': observedValue }), [observedValue]);
}
