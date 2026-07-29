import { clsx } from 'clsx';
import type { TableCellLayoutState } from './TableCellLayout.types';

import styles from './TableCellLayout.module.css';

/**
 * TableCellLayout's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TableCellLayout` / `fui-TableCellLayout__<slot>` BEM statics are gone (D16.1) and the
 * type has narrowed from `SlotClassNames<TableCellLayoutSlots>` to `{ root: string }`, so a
 * read of `media`, `main`, `description` or `content` is a compile error on the exact line
 * that would otherwise have silently stopped matching.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(tableCellLayoutClassNames.root)` from `@fluentui/react-utilities` (D16.5).
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

  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`). Sub-slots pass no marker — a group cannot
  // style itself, so a marker on `media` / `main` / `description` / `content` would serve
  // nothing but those slots' own descendants.
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableCellLayout.module.css
  // and by block order within it, not by the order of these arguments — see that file's
  // header for the mapping back to the mergeClasses() argument order.
  //
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(
    styles.root,
    'group/fui-table-cell-layout',
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
    // Both arguments are conditional, exactly as the Griffel source had them. That is safe
    // on a marker-free slot: D15.1's `classList[0]` invariant only binds slots that emit a
    // `group/…` token, so no identity-only local is minted here.
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
