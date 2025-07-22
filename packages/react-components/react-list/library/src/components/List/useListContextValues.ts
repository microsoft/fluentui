import * as React from 'react';
import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { selection, navigationMode, listItemRole, validateListItem } = state;

  const listContext = {
    selection,
    navigationMode,
    validateListItem,
  };

  const synchronousContext = React.useMemo(
    () => ({
      listItemRole,
      navigationMode,
    }),
    [listItemRole, navigationMode],
  );

  return {
    listContext,
    synchronousContext,
  };
}
