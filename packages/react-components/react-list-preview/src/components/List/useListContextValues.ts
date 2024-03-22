import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { selection, as, navigationMode, listItemRole, validateListItems } = state;

  const listContext = {
    selection,
    as,
    listItemRole,
    navigationMode,
    validateListItems,
  };

  return {
    listContext,
  };
}
