import * as React from 'react';
import { Context, ContextSelector, ContextValues } from './types';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';

/**
 * This hook returns context selected value by selectors.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelectors = <
  Value extends Record<string, any>,
  Properties extends string,
  Selectors extends Record<Properties, ContextSelector<Value, SelectedValue>>,
  SelectedValue extends any,
>(
  context: Context<Value>,
  selectors: Selectors,
): Record<Properties, SelectedValue> => {
  const contextValue = React.useContext(context as unknown as Context<ContextValues<Value>>);
  const { value: valueRef, listeners } = contextValue;

  // Read valueRef during render and return selectors(value) directly. This is analogous to `useSyncExternalStore`'s
  // `getSnapshot` and is the only way to select slices from a shared ref-based store without re-rendering every
  // consumer on every provider update.
  const valueAtRender = {} as Record<Properties, SelectedValue>;
  Object.keys(selectors).forEach((key: Properties) => {
    valueAtRender[key] = selectors[key](valueRef.current);
  });

  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // Refs holding the current selectors map and the most-recently-returned slice map. Updated in a layout effect
  // (ordering: children first, then provider) so they are current by the time the provider's listener loop fires.
  const selectorsRef = React.useRef<Selectors>(selectors);
  const lastValueAtRender = React.useRef<Record<Properties, SelectedValue>>(valueAtRender);

  useIsomorphicLayoutEffect(() => {
    selectorsRef.current = selectors;
    lastValueAtRender.current = valueAtRender;
  });

  useIsomorphicLayoutEffect(() => {
    const listener = (payload: Record<string, Value>) => {
      // Selectors can throw on transiently-inconsistent inputs. Swallow so a single consumer's throw doesn't abort
      // the provider's `listeners.forEach`.
      try {
        const nextSelected = {} as Record<Properties, SelectedValue>;
        Object.keys(selectorsRef.current).forEach((key: Properties) => {
          nextSelected[key] = selectorsRef.current[key](payload as unknown as Value);
        });

        const hasChanges = Object.keys(selectorsRef.current).some(
          (key: Properties) => !Object.is(lastValueAtRender.current[key], nextSelected[key]),
        );

        if (hasChanges) {
          forceUpdate();
        }
      } catch {
        // ignored (stale props or similar — heals on the next parent-driven render)
      }
    };

    listeners.push(listener);

    // Effect-fixup: catch updates that occurred between render and effect run (Relay's useFragmentInternal pattern).
    listener(valueRef.current as unknown as Record<string, Value>);

    return () => {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }, [listeners, valueRef]);

  return valueAtRender;
};
