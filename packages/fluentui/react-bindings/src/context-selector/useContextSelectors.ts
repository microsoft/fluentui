import * as React from 'react';
import { Context, ContextSelector, ContextVersion, ContextValues } from './types';
import { useIsomorphicLayoutEffect } from './utils';

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

  const {
    value: { current: value },
    version: { current: version },
    listeners,
  } = contextValue;

  const selected = {} as Record<Properties, SelectedValue>;
  Object.keys(selectors).forEach((key: Properties) => {
    selected[key] = selectors[key](value);
  });

  const [state, dispatch] = React.useReducer(
    (
      prevState: readonly [
        Value /* contextValue */,
        Record<Properties, SelectedValue> /* { [key]: selector(value) } */,
      ],
      payload:
        | undefined // undefined from render below
        | readonly [ContextVersion, Value], // from provider effect
    ) => {
      if (!payload) {
        // early bail out when is dispatched during render
        return [value, selected] as const;
      }

      if (payload[0] <= version) {
        const stateHasNotChanged = Object.keys(selectors).every((key: Properties) =>
          Object.is((prevState[1] as { [key: string]: any })[key] as SelectedValue, selected[key]),
        );

        if (stateHasNotChanged) {
          return prevState; // bail out
        }

        return [value, selected] as const;
      }

      try {
        const statePayloadHasChanged = Object.keys(prevState[0]).some((key: Properties) => {
          return !Object.is(prevState[0] /* previous contextValue */[key], payload[1] /* current contextValue */[key]);
        });

        if (!statePayloadHasChanged) {
          return prevState;
        }

        const nextSelected = {} as Record<Properties, SelectedValue>;
        Object.keys(selectors).forEach((key: Properties) => {
          nextSelected[key] = selectors[key](payload[1]);
        });

        const selectedHasNotChanged = Object.keys(selectors).every((key: Properties) => {
          return Object.is(prevState[1][key] /* previous { [key]: selector(value) } */, nextSelected[key]);
        });

        if (selectedHasNotChanged) {
          return prevState;
        }

        return [payload[1], nextSelected] as const;
      } catch (e) {
        // ignored (stale props or some other reason)
      }
      return [...prevState] as const; // schedule update
    },
    [value, selected] as const,
  );

  // schedule re-render when selected context is updated
  const hasSelectedValuesUpdates = Object.keys(selectors).find(
    (key: Properties) => !Object.is(state[1] /* previous { [key]: selector(value) } */[key], selected[key]),
  );
  if (hasSelectedValuesUpdates !== undefined) {
    dispatch(undefined);
  }

  useIsomorphicLayoutEffect(() => {
    listeners.push(dispatch);

    return () => {
      const index = listeners.indexOf(dispatch);
      listeners.splice(index, 1);
    };
  }, [listeners]);

  return state[1] as Record<Properties, SelectedValue>;
};
