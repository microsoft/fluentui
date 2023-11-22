import * as React from 'react';
import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { focusableItems, selection, as } = state;

  const listContext = React.useMemo(
    () => ({
      focusableItems,
      selection,
      as,
    }),
    [focusableItems, selection, as],
  );

  return {
    listContext,
  };
}
