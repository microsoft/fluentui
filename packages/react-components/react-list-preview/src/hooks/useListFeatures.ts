import { ListFeaturePlugin, UseListFeaturesOptions } from './types';
import { defaultListSelectionState } from './useListSelection';

export function useListFeatures<TItem>(options: UseListFeaturesOptions<TItem>, plugins: ListFeaturePlugin[] = []) {
  const { items } = options;
  // const getRows = (rowEnhancer = defaultRowEnhancer) =>
  //   items.map((item, i) => rowEnhancer({ item, rowId: getRowId?.(item) ?? i }));

  const initialState = {
    // getRowId,
    items,
    selection: defaultListSelectionState,
    // columns,
    // getRows,
    // selection: defaultTableSelectionState,
    // sort: defaultTableSortState,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // columnSizing_unstable: defaultColumnSizingState,
    // tableRef: React.createRef(),
  };

  return plugins.reduce((state, plugin) => plugin(state), initialState);
}
