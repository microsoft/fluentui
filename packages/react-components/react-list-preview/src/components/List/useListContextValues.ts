import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { selection, as, accessibilityRoles } = state;

  const listContext = {
    selection,
    as,
    accessibilityRoles,
  };

  return {
    listContext,
  };
}
