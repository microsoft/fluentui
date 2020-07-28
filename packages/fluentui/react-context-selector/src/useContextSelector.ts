import * as React from 'react';

import { Context, ContextSelector, ContextValue } from './types';
import { useIsomorphicLayoutEffect } from './utils';

type UseSelectorRef<Value, SelectedValue> = {
  selector: ContextSelector<Value, SelectedValue>;
  selected: SelectedValue;
  value: Value;
};

/**
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selector: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  const { subscribe, value } = React.useContext((context as unknown) as Context<ContextValue<Value>>);
  const [, forceUpdate] = React.useReducer((c: number) => c + 1, 0) as [never, () => void];

  const ref = React.useRef<UseSelectorRef<Value, SelectedValue>>();
  const selected = selector(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = {
      selector,
      value,
      selected,
    };
  });
  useIsomorphicLayoutEffect(() => {
    const callback = (nextState: Value) => {
      try {
        const reference: UseSelectorRef<Value, SelectedValue> = ref.current as NonNullable<
          UseSelectorRef<Value, SelectedValue>
        >;

        if (reference.value === nextState || Object.is(reference.selected, reference.selector(nextState))) {
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
