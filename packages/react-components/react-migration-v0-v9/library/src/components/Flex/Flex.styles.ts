import styles from './Flex.module.css';

/*
 * The key set of the exported style maps is PUBLIC API — `useFlexStyles` / `useGridStyles` /
 * `useItemLayoutStyles` are exported from the package root and their unions are recorded in
 * `etc/react-migration-v0-v9.api.md`. The union is therefore spelled INLINE on each exported
 * signature rather than behind a local alias: a local alias would appear in the api report as
 * an unresolved name and hide the very key set the report exists to pin. The camelCase keys
 * survive the conversion verbatim even though the module-local class names they point at are
 * lowercase-kebab (DECISIONS.md D15.2).
 *
 * The `gapValues` / `paddingValues` constants that used to sit here are gone: their px
 * literals now live in `Flex.module.css` as spacing utilities (D4 amendment — named steps
 * first, numeric fallback for the two values that match no step).
 */

const flexStyles = {
  flex: styles.flex,
  inline: styles.inline,
  column: styles.column,
  alignItemsFlexStart: styles['align-items-flex-start'],
  alignItemsCenter: styles['align-items-center'],
  alignItemsFlexEnd: styles['align-items-flex-end'],
  alignItemsStretch: styles['align-items-stretch'],
  justifyContentFlexStart: styles['justify-content-flex-start'],
  justifyContentCenter: styles['justify-content-center'],
  justifyContentFlexEnd: styles['justify-content-flex-end'],
  justifyContentStretch: styles['justify-content-stretch'],
  justifyContentSpaceAround: styles['justify-content-space-around'],
  justifyContentSpaceBetween: styles['justify-content-space-between'],
  justifyContentSpaceEvenly: styles['justify-content-space-evenly'],
  wrap: styles.wrap,
  fill: styles.fill,
  gapForColumnFlexSmall: styles['gap-for-column-flex-small'],
  gapForColumnFlexSmaller: styles['gap-for-column-flex-smaller'],
  gapForColumnFlexMedium: styles['gap-for-column-flex-medium'],
  gapForColumnFlexLarge: styles['gap-for-column-flex-large'],
  gapForRowFlexSmall: styles['gap-for-row-flex-small'],
  gapForRowFlexSmaller: styles['gap-for-row-flex-smaller'],
  gapForRowFlexMedium: styles['gap-for-row-flex-medium'],
  gapForRowFlexLarge: styles['gap-for-row-flex-large'],
  paddingMedium: styles['padding-medium'],
};

/**
 * The class map for Flex. Kept as a callable with the `use` prefix because that is its
 * public shape; it is no longer a React hook (the declarations are static CSS now) and the
 * object it returns is a stable module constant, so `Flex.tsx`'s `useMemo([classes])` never
 * re-runs.
 */
export const useFlexStyles = (): Record<
  | 'flex'
  | 'fill'
  | 'inline'
  | 'column'
  | 'wrap'
  | 'alignItemsFlexStart'
  | 'alignItemsCenter'
  | 'alignItemsFlexEnd'
  | 'alignItemsStretch'
  | 'justifyContentFlexStart'
  | 'justifyContentCenter'
  | 'justifyContentFlexEnd'
  | 'justifyContentStretch'
  | 'justifyContentSpaceAround'
  | 'justifyContentSpaceBetween'
  | 'justifyContentSpaceEvenly'
  | 'gapForColumnFlexSmall'
  | 'gapForColumnFlexSmaller'
  | 'gapForColumnFlexMedium'
  | 'gapForColumnFlexLarge'
  | 'gapForRowFlexSmall'
  | 'gapForRowFlexSmaller'
  | 'gapForRowFlexMedium'
  | 'gapForRowFlexLarge'
  | 'paddingMedium',
  string
> => flexStyles;
