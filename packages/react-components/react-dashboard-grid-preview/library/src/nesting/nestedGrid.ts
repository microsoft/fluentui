export type DashboardGridNestedLayout = 'list' | 'compact' | 'moveScale' | 'move' | 'scale' | 'none';

export type DashboardGridNestedGridOptions = {
  columns?: number | 'auto';
  layout?: DashboardGridNestedLayout;
  items?: readonly unknown[];
  defaultItems?: readonly unknown[];
  responsive?: unknown;
  id?: string;
  [key: string]: unknown;
};

const excludedNestedKeys = new Set(['id', 'items', 'defaultItems', 'responsive', 'children', 'parentGridId']);

export const createDashboardGridNestedOptions = (
  parentOptions: DashboardGridNestedGridOptions,
  template: DashboardGridNestedGridOptions | undefined,
  parentItemColumnSpan: number,
  incomingItemColumnSpan = 1,
): DashboardGridNestedGridOptions => {
  const inherited: DashboardGridNestedGridOptions = {};

  for (const [key, value] of Object.entries(parentOptions)) {
    if (!excludedNestedKeys.has(key)) {
      inherited[key] = value;
    }
  }

  const merged = { ...inherited, ...template };
  const columns =
    merged.columns === 'auto'
      ? Math.max(1, parentItemColumnSpan, incomingItemColumnSpan)
      : merged.columns;

  return {
    ...merged,
    columns,
    layout: merged.layout ?? 'list',
  };
};

export const getDashboardGridNestedColumns = (
  configuredColumns: number | 'auto' | undefined,
  parentItemColumnSpan: number,
  incomingItemColumnSpan = 1,
): number =>
  configuredColumns === 'auto' || configuredColumns === undefined
    ? Math.max(1, parentItemColumnSpan, incomingItemColumnSpan)
    : Math.max(1, configuredColumns);
