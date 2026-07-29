'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

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
