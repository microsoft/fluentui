import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import * as React from 'react';

import { Context, ContextSelector, ContextValue, ContextVersion } from './types';

/**
 * Narrowing React.Reducer type to be more easily usable below.
 * No need to export this as it's for internal reducer usage.
 */
type ContextReducer<Value, SelectedValue> = React.Reducer<
  readonly [Value, SelectedValue],
  undefined | readonly [ContextVersion, Value]
>;

/**
 * This hook returns context selected value by selector.
 * It will only accept context created by `createContext`.
 * It will trigger re-render if only the selected value is referencially changed.
 */
export const useContextSelector = <Value, SelectedValue>(
  context: Context<Value>,
  selector: ContextSelector<Value, SelectedValue>,
): SelectedValue => {
  const contextValue = React.useContext((context as unknown) as Context<ContextValue<Value>>);

  const {
    value: { current: value },
    version: { current: version },
    listeners,
  } = contextValue;
  const selected = selector(value);

  const [state, dispatch] = React.useReducer<ContextReducer<Value, SelectedValue>>(
    (
      prevState: readonly [Value /* contextValue */, SelectedValue /* selector(value) */],
      payload:
        | undefined // undefined from render below
        | readonly [ContextVersion, Value], // from provider effect
    ): readonly [Value, SelectedValue] => {
      if (!payload) {
        // early bail out when is dispatched during render
        return [value, selected] as const;
      }

      if (payload[0] <= version) {
        if (objectIs(prevState[1], selected)) {
          return prevState; // bail out
        }

        return [value, selected] as const;
      }

      try {
        if (objectIs(prevState[0], payload[1])) {
          return prevState; // do not update
        }

        const nextSelected = selector(payload[1]);

        if (objectIs(prevState[1], nextSelected)) {
          return prevState; // do not update
        }

        return [payload[1], nextSelected] as const;
      } catch (e) {
        // ignored (stale props or some other reason)
      }

      // explicitly spread to enforce typing
      return [prevState[0], prevState[1]] as const; // schedule update
    },
    [value, selected] as const,
  );

  if (!objectIs(state[1], selected)) {
    // schedule re-render
    // this is safe because it's self contained
    dispatch(undefined);
  }

  useIsomorphicLayoutEffect(() => {
    listeners.push(dispatch);

    return () => {
      const index = listeners.indexOf(dispatch);
      listeners.splice(index, 1);
    };
  }, [listeners]);

  return state[1] as SelectedValue;
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function is(x: any, y: any) {
  return (
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectIs: (x: any, y: any) => boolean =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore fallback to native if it exists (not in IE11)
  typeof Object.is === 'function' ? Object.is : is;
