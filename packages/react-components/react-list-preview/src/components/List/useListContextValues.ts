import * as React from 'react';
import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { focusableItems, items, selection, as } = state;

  const listContext = React.useMemo(
    () => ({
      focusableItems,
      items,
      selection,
      as,
    }),
    [focusableItems, items, selection, as],
  );

  return {
    listContext,
  };
}
