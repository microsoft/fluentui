import * as React from 'react';
import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { focusableItems, items, registerItem, deregisterItem, selection, as } = state;

  const listContext = React.useMemo(
    () => ({
      focusableItems,
      items,
      registerItem,
      deregisterItem,
      selection,
      as,
    }),
    [focusableItems, items, registerItem, deregisterItem, selection, as],
  );

  return {
    listContext,
  };
}
