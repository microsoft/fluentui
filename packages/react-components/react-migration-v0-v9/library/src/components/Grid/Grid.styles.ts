import styles from './Grid.module.css';

/*
 * The key set of the exported style maps is PUBLIC API — `useFlexStyles` / `useGridStyles` /
 * `useItemLayoutStyles` are exported from the package root and their unions are recorded in
 * `etc/react-migration-v0-v9.api.md`. The union is therefore spelled INLINE on each exported
 * signature rather than behind a local alias: a local alias would appear in the api report as
 * an unresolved name and hide the very key set the report exists to pin. The camelCase keys
 * survive the conversion verbatim even though the module-local class names they point at are
 * lowercase-kebab (DECISIONS.md D15.2).
 */

const gridStyles = {
  grid: styles.grid,
  onlyRows: styles['only-rows'],
  rows1: styles.rows1,
  rows2: styles.rows2,
  rows3: styles.rows3,
  columns1: styles.columns1,
  columns2: styles.columns2,
  columns3: styles.columns3,
  columnsDefault: styles['columns-default'],
};

/**
 * The class map for GridShim. Kept as a callable with the `use` prefix because that is its
 * public shape; it is no longer a React hook and the object it returns is a stable module
 * constant, so `GridShim.tsx`'s `useMemo([classes])` never re-runs.
 */
export const useGridStyles = (): Record<
  'grid' | 'onlyRows' | 'rows1' | 'rows2' | 'rows3' | 'columns1' | 'columns2' | 'columns3' | 'columnsDefault',
  string
> => gridStyles;
