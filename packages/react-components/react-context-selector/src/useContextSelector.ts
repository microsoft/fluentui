import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import type { Context, ContextSelector, ContextValue } from './types';

function checkIfSnapshotChanged<T>(inst: { value: T; getSnapshot: () => T }): boolean {
  const latestGetSnapshot = inst.getSnapshot;
  const prevValue = inst.value;
  try {
    const nextValue = latestGetSnapshot();
    return !Object.is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

/**
 * @internal
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referentially changed.
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selector: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  'use no memo';

  const store = React.useContext(context as React.Context<ContextValue<Value>>);
  const getSnapshot = () => selector(store.value);

  const value = getSnapshot();
  const [{ inst }, forceUpdate] = React.useState({
    inst: { value, getSnapshot },
  });

  useIsomorphicLayoutEffect(() => {
    inst.value = value;
    inst.getSnapshot = getSnapshot;

    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, getSnapshot]);

  React.useEffect(() => {
    if (checkIfSnapshotChanged(inst)) {
      forceUpdate({ inst });
    }

    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) {
        forceUpdate({ inst });
      }
    };

    return store.subscribe(handleStoreChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);

  return value;
};
