import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { navigable, selection, as, truncateContent, truncateHeader } = state;

  const listContext = {
    navigable,
    selection,
    as,
    truncateContent,
    truncateHeader,
  };

  return {
    listContext,
  };
}
