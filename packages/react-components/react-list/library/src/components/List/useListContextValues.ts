import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { selection, navigationMode, listItemRole, validateListItem } = state;

  const listContext = {
    selection,
    navigationMode,
    validateListItem,
  };

  const synchronousContext = {
    listItemRole,
    navigationMode,
  };

  return {
    listContext,
    synchronousContext,
  };
}
