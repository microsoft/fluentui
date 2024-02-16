import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { selection, as } = state;

  const listContext = {
    selection,
    as,
  };

  return {
    listContext,
  };
}
