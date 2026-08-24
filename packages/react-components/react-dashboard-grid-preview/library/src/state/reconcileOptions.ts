import type { DashboardGridLayoutItemInput } from '../engine';
import type { DashboardGridItemDefinition } from './DashboardGridStore.types';
import { toDashboardGridEngineItem } from './DashboardGridStore.types';

const itemKeys: ReadonlyArray<keyof DashboardGridLayoutItemInput> = [
  'id',
  'column',
  'row',
  'columnSpan',
  'rowSpan',
  'minColumnSpan',
  'maxColumnSpan',
  'minRowSpan',
  'maxRowSpan',
  'autoPosition',
  'movable',
  'resizable',
  'locked',
];

export const areDashboardGridEngineItemsEqual = (
  left: DashboardGridLayoutItemInput,
  right: DashboardGridLayoutItemInput,
): boolean => itemKeys.every(key => left[key] === right[key]);

export const areDashboardGridItemsEqual = (
  left: readonly DashboardGridItemDefinition[] | undefined,
  right: readonly DashboardGridItemDefinition[] | undefined,
): boolean => {
  if (left === right) {
    return true;
  }

  if (!left || !right || left.length !== right.length) {
    return false;
  }

  return left.every((item, index) => {
    const candidate = right[index];
    return (
      areDashboardGridEngineItemsEqual(toDashboardGridEngineItem(item), toDashboardGridEngineItem(candidate)) &&
      item.label === candidate.label &&
      item.component === candidate.component &&
      item.content === candidate.content &&
      item.props === candidate.props &&
      item.data === candidate.data &&
      item.lazyMount === candidate.lazyMount &&
      item.sizeToContent === candidate.sizeToContent &&
      item.print?.hide === candidate.print?.hide &&
      item.print?.pageBreakBefore === candidate.print?.pageBreakBefore &&
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compares the legacy print field for migration compatibility.
      item.print?.pageBreak === candidate.print?.pageBreak &&
      item.print?.orientation === candidate.print?.orientation &&
      item.subGrid === candidate.subGrid &&
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- Compares the legacy nested-grid field for migration compatibility.
      item.nestedGrid === candidate.nestedGrid
    );
  });
};

export const areDashboardGridLayoutsEqual = (
  left: readonly DashboardGridItemDefinition[] | undefined,
  right: readonly DashboardGridItemDefinition[] | undefined,
): boolean => {
  if (left === right) {
    return true;
  }

  if (!left || !right || left.length !== right.length) {
    return false;
  }

  return left.every((item, index) =>
    areDashboardGridEngineItemsEqual(
      toDashboardGridEngineItem(item),
      toDashboardGridEngineItem(right[index]),
    ),
  );
};

export const copyDashboardGridItems = (
  items: readonly DashboardGridItemDefinition[] | undefined,
): readonly DashboardGridItemDefinition[] | undefined => items?.map(item => ({ ...item }));
