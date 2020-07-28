import * as React from 'react';

import { Context, ContextSelector, ContextValue } from './types';
import { useIsomorphicLayoutEffect } from './utils';

type UseSelectorsRef<
  Value,
  Properties extends string,
  Selectors extends Record<Properties, ContextSelector<Value, SelectedValue>>,
  SelectedValue extends any
> = {
  selectors: Selectors;
  value: Value;
  selected: Record<Properties, SelectedValue>;
};

/**
 * This hook returns context selected value by selectors.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelectors = <
  Value,
  Properties extends string,
  Selectors extends Record<Properties, ContextSelector<Value, SelectedValue>>,
  SelectedValue extends any
>(
  context: Context<Value>,
  selectors: Selectors,
): Record<Properties, SelectedValue> => {
  const { subscribe, value } = React.useContext((context as unknown) as Context<ContextValue<Value>>);
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  const ref = React.useRef<UseSelectorsRef<Value, Properties, Selectors, SelectedValue>>();
  const selected = {} as Record<Properties, SelectedValue>;

  Object.keys(selectors).forEach((key: Properties) => {
    selected[key] = selectors[key](value);
  });

  useIsomorphicLayoutEffect(() => {
    ref.current = {
      selectors,
      value,
      selected,
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState: Value) => {
      try {
        const reference: UseSelectorsRef<Value, Properties, Selectors, SelectedValue> = ref.current as NonNullable<
          UseSelectorsRef<Value, Properties, Selectors, SelectedValue>
        >;

        if (
          reference.value === nextState ||
          Object.keys(reference.selected).every((key: Properties) =>
            Object.is(reference.selected[key], reference.selectors[key](nextState)),
          )
        ) {
          // not changed
          return;
        }
      } catch (e) {
        // ignored (stale props or some other reason)
      }

      forceUpdate();
    };

    return subscribe(callback);
  }, [subscribe]);

  return selected;
};
