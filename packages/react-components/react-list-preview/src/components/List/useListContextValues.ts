import { ListContextValues, ListState } from './List.types';

export function useListContextValues_unstable(state: ListState): ListContextValues {
  const { focusableItems, selection, as } = state;

  const listContext = {
    focusableItems,
    selection,
    as,
  };

  return {
    listContext,
  };
}
