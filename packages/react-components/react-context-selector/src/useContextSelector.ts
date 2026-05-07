'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import type { Context, ContextSelector, ContextValue } from './types';

/**
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referentially changed.
 *
 * @internal
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selectorFn: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  const contextValue = React.useContext(context as unknown as Context<ContextValue<Value>>);
  const { value: valueRef, listeners } = contextValue;

  // Read valueRef during render and return selector(value) directly. This is analogous to `useSyncExternalStore`'s
  // `getSnapshot` and is the only way to select a slice from a shared ref-based store without re-rendering every
  // consumer on every provider update.
  const valueAtRender = selectorFn(valueRef.current);
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // Refs holding the current selector and the most-recently-returned slice.
  // Updated in a layout effect (ordering: children first, then provider) so
  // they are current by the time the provider's listener loop fires.
  const selectorFnRef = React.useRef<ContextSelector<Value, SelectedValue>>(selectorFn);
  const lastValueAtRender = React.useRef<SelectedValue>(valueAtRender);

  useIsomorphicLayoutEffect(() => {
    selectorFnRef.current = selectorFn;
    lastValueAtRender.current = valueAtRender;
  });

  useIsomorphicLayoutEffect(() => {
    const listener = (payload: Value) => {
      // Selectors can throw on transiently-inconsistent inputs (stale props vs. newer context value). Swallow so a
      // single consumer's throw doesn't abort the provider's `listeners.forEach`.
      try {
        const nextSelectedValue = selectorFnRef.current(payload);

        if (!Object.is(lastValueAtRender.current, nextSelectedValue)) {
          forceUpdate();
        }
      } catch {
        // ignored (stale props or similar — heals on the next parent-driven render)
      }
    };

    listeners.push(listener);

    // Effect-fixup: catch updates that occurred between render and effect run (Relay's useFragmentInternal pattern).
    listener(valueRef.current);

    return () => {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [listeners, valueRef]);

  return valueAtRender;
};
