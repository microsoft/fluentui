import * as React from 'react';
import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { focusableItems } = state;

  const listContext = React.useMemo(
    () => ({
      focusableItems,
    }),
    [focusableItems],
  );

  return {
    listContext,
  };
}
