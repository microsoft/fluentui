import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { Context, ContextSelector, ContextValue, ContextVersion } from './types';

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
  const contextValue = React.useContext(context as unknown as Context<ContextValue<Value>>);

  const {
    value: { current: value },
    version: { current: version },
    listeners,
  } = contextValue;
  const selected = selector(value);

  const [state, setState] = React.useState<readonly [Value, SelectedValue]>([value, selected]);
  const dispatch = (
    payload:
      | undefined // undefined from render below
      | readonly [ContextVersion, Value], // from provider effect
  ) => {
    setState(prevState => {
      if (!payload) {
        // early bail out when is dispatched during render
        return [value, selected] as const;
      }

      if (payload[0] <= version) {
        if (Object.is(prevState[1], selected)) {
          return prevState; // bail out
        }

        return [value, selected] as const;
      }

      try {
        if (Object.is(prevState[0], payload[1])) {
          return prevState; // do not update
        }

        const nextSelected = selector(payload[1]);

        if (Object.is(prevState[1], nextSelected)) {
          return prevState; // do not update
        }

        return [payload[1], nextSelected] as const;
      } catch (e) {
        // ignored (stale props or some other reason)
      }

      // explicitly spread to enforce typing
      return [prevState[0], prevState[1]] as const; // schedule update
    });
  };

  if (!Object.is(state[1], selected)) {
    // schedule re-render
    // this is safe because it's self contained
    dispatch(undefined);
  }

  const stableDispatch = useEventCallback(dispatch);

  useIsomorphicLayoutEffect(() => {
    listeners.push(stableDispatch);

    return () => {
      const index = listeners.indexOf(stableDispatch);
      listeners.splice(index, 1);
    };
  }, [stableDispatch, listeners]);

  return state[1] as SelectedValue;
};
