import { ListFeaturePlugin, UseListFeaturesOptions } from './types';
import { defaultListSelectionState } from './useListSelection';

export function useListFeatures<TItem extends { id: string | number }>(
  options: UseListFeaturesOptions<TItem>,
  plugins: ListFeaturePlugin[] = [],
) {
  const { items } = options;

  const initialState = {
    items,
    selection: defaultListSelectionState,
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
