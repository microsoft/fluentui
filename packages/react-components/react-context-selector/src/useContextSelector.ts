'use client';

import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import type { Context, ContextSelector, ContextValue, ContextVersion } from './types';

/**
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referentially changed.
 *
 * @internal
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selector: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  const contextValue = React.useContext(context as unknown as Context<ContextValue<Value>>);
  const { value: valueRef, listeners } = contextValue;

  // Read valueRef during render and return selector(value) directly. This is
  // analogous to useSyncExternalStore's getSnapshot and is the only way to
  // select a slice from a shared ref-based store without re-rendering every
  // consumer on every provider update.
  const selectedAtRender = selector(valueRef.current);

  // Opaque force-update. Kept deliberately separate from a `[value, selected]`
  // useState tuple: the previous implementation relied on React's eager-bailout
  // fast path (`setState(prev => prev)` → `Object.is(eagerState, currentState)`)
  // which silently stops firing after any listener-driven render commits — the
  // fiber bound at mount becomes the stale alternate and its `fiber.lanes`
  // retains SyncLane, permanently failing the `NoLanes` precondition of
  // `dispatchSetStateInternal`. See RFC addendum "Option D" for details.
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // Refs holding the current selector and the most-recently-returned slice.
  // Updated in a layout effect (ordering: children first, then provider) so
  // they are current by the time the provider's listener loop fires.
  const selectorRef = React.useRef<ContextSelector<Value, SelectedValue>>(selector);
  const lastReturnedRef = React.useRef<SelectedValue>(selectedAtRender);

  useIsomorphicLayoutEffect(() => {
    selectorRef.current = selector;
    lastReturnedRef.current = selectedAtRender;
  });

  useIsomorphicLayoutEffect(() => {
    const listener = (payload: readonly [ContextVersion, Value]) => {
      const next = selectorRef.current(payload[1]);
      if (!Object.is(lastReturnedRef.current, next)) {
        forceUpdate();
      }
    };
    listeners.push(listener);

    // Effect-fixup: catch updates that occurred between render and effect run
    // (Relay's useFragmentInternal pattern).
    const nextAtEffect = selectorRef.current(valueRef.current);
    if (!Object.is(lastReturnedRef.current, nextAtEffect)) {
      forceUpdate();
    }

    return () => {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeners, valueRef]);

  return selectedAtRender;
};
