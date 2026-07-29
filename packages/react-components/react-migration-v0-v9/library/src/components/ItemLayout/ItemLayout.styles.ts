import styles from './ItemLayout.module.css';

/*
 * The key set of the exported style maps is PUBLIC API — `useFlexStyles` / `useGridStyles` /
 * `useItemLayoutStyles` are exported from the package root and their unions are recorded in
 * `etc/react-migration-v0-v9.api.md`. The union is therefore spelled INLINE on each exported
 * signature rather than behind a local alias: a local alias would appear in the api report as
 * an unresolved name and hide the very key set the report exists to pin. The camelCase keys
 * survive the conversion verbatim even though the module-local class names they point at are
 * lowercase-kebab (DECISIONS.md D15.2).
 */

const itemLayoutStyles = {
  root: styles.root,
  contentMedia: styles['content-media'],
  contentWrapper: styles['content-wrapper'],
  header: styles.header,
  headerMedia: styles['header-media'],
  startMedia: styles['start-media'],
  endMedia: styles['end-media'],
};

/**
 * The class map for ItemLayout. Kept as a callable with the `use` prefix because that is its
 * public shape; it is no longer a React hook and the object it returns is a stable module
 * constant.
 */
export const useItemLayoutStyles = (): Record<
  'root' | 'header' | 'contentMedia' | 'contentWrapper' | 'headerMedia' | 'startMedia' | 'endMedia',
  string
> => itemLayoutStyles;
