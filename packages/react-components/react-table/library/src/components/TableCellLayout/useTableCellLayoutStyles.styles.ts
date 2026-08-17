import { clsx } from 'clsx';
import type { TableCellLayoutState } from './TableCellLayout.types';

import styles from './TableCellLayout.module.css';

/**
 * TableCellLayout's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const tableCellLayoutClassNames: { root: string } = {
  root: 'group/fui-table-cell-layout',
};

/**
 * The `media` slot's size step. `small` and `medium` share one slice in the Griffel source,
 * so the map is kept rather than folded into a `size-*` variant: `size` here is read from
 * the Table CONTEXT, not from a prop on this component, and no descendant needs it from CSS
 * (DECISIONS.md D15.6 — data attributes are a fallback, not a default).
 */
const mediaSizeClassNames: Record<TableCellLayoutState['size'], string> = {
  small: 'media-small-and-medium',
  medium: 'media-small-and-medium',
  'extra-small': 'media-extra-small',
};

/**
 * Apply styling to the TableCellLayout slots based on the state
 */
export const useTableCellLayoutStyles_unstable = (state: TableCellLayoutState): TableCellLayoutState => {
  const { truncate } = state;
  const primary = state.appearance === 'primary';

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    tableCellLayoutClassNames.root,
    truncate && styles['root-truncate'],
    state.root.className,
  );

  if (state.media) {
    state.media.className = clsx(
      styles.media,
      styles[mediaSizeClassNames[state.size]],
      primary && styles['media-primary'],
      state.media.className,
    );
  }

  if (state.main) {
    // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
    // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
    state.main.className = clsx(
      truncate && styles['main-truncate'],
      primary && styles['main-primary'],
      state.main.className,
    );
  }

  if (state.description) {
    state.description.className = clsx(styles.description, state.description.className);
  }

  if (state.content) {
    state.content.className = clsx(styles.content, truncate && styles['content-truncate'], state.content.className);
  }

  return state;
};
