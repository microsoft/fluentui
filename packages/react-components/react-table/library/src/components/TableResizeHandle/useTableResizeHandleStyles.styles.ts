import { clsx } from 'clsx';
import type { TableResizeHandleState } from './TableResizeHandle.types';

import styles from './TableResizeHandle.module.css';

/**
 * TableResizeHandle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector: use
 * `fuiSelector(tableResizeHandleClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 */
export const tableResizeHandleClassNames: { root: string } = {
  root: 'group/fui-table-resize-handle',
};

/**
 * Apply styling to the TableResizeHandle slots based on the state
 */
export const useTableResizeHandleStyles_unstable = (state: TableResizeHandleState): TableResizeHandleState => {
  // Module class first, named group marker second, consumer className last. `styles.root`
  // is unconditional, so the marker is never `classList[0]` (DECISIONS.md D15.1 / D16.2;
  // asserted by `component-has-group-marker`).
  //
  // Cascade priority is decided by the `@layer fui.*` order in TableResizeHandle.module.css.
  // The state-mutation pattern is PRESERVED during conversion (DECISIONS.md D14).
  state.root.className = clsx(styles.root, tableResizeHandleClassNames.root, state.root.className);

  return state;
};
