import * as React from 'react';

import { useSyncExternalStore } from './useSyncExternalStore';
import type { Context, ContextSelector, ContextValue } from './types';

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
  const store = React.useContext(context as React.Context<ContextValue<Value>>);

  return useSyncExternalStore(store.subscribe, () => selector(store.value));
};
