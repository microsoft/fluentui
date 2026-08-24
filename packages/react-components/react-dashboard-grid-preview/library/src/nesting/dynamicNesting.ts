import type { DashboardGridLayoutItemInput, DashboardGridRect } from '../engine';
import type { DashboardGridRegistry } from '../provider/DashboardGridRegistry.types';
import type { DashboardGridItemDefinition, DashboardGridStore } from '../state/DashboardGridStore.types';
import { getDashboardGridNestedColumns } from './nestedGrid';

export type DashboardGridNestedGridBinding = {
  parentStore: DashboardGridStore;
  parentItemId: string;
  childStore: DashboardGridStore;
  columns: number | 'auto' | undefined;
};

export const synchronizeDashboardGridNestedColumns = (
  binding: DashboardGridNestedGridBinding,
): void => {
  const parentItem = binding.parentStore.getItem(binding.parentItemId);
  if (!parentItem) {
    return;
  }

  const columns = getDashboardGridNestedColumns(binding.columns, parentItem.columnSpan);
  if (binding.childStore.getSnapshot().columns !== columns) {
    binding.childStore.setColumns(columns, 'list');
  }
};

export const flattenDashboardGridNestedItems = (
  parentRect: DashboardGridRect,
  items: readonly DashboardGridItemDefinition[],
): DashboardGridItemDefinition[] =>
  items.map(item => ({
    ...item,
    column: parentRect.column + (item.column ?? 0),
    row: parentRect.row + (item.row ?? 0),
  }));

export const requestDashboardGridDynamicNesting = (
  registry: DashboardGridRegistry,
  options: {
    sourceGridId: string;
    targetGridId: string;
    itemId: string;
    targetItemId: string;
    coverage: number;
    nativeEvent?: Event;
  },
): ReturnType<DashboardGridRegistry['requestNesting']> =>
  registry.requestNesting({
    sourceGridId: options.sourceGridId,
    targetGridId: options.targetGridId,
    itemId: options.itemId,
    targetItemId: options.targetItemId,
    coverage: options.coverage,
    nativeEvent: options.nativeEvent,
  });

export const createDashboardGridNestedItemInput = (
  item: DashboardGridItemDefinition,
  parentColumnSpan: number,
): DashboardGridLayoutItemInput => ({
  ...item,
  column: item.column,
  row: item.row,
  columnSpan: Math.min(item.columnSpan ?? 1, Math.max(1, parentColumnSpan)),
});
