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

import { clsx } from 'clsx';
import type { TableResizeHandleState } from './TableResizeHandle.types';

import styles from './TableResizeHandle.module.css';

/**
 * TableResizeHandle's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-TableResizeHandle` BEM static is gone (D16.1) and the type has narrowed from
 * `SlotClassNames<TableResizeHandleSlots>` to `{ root: string }`. The pre-existing TODO
 * about adding `fui-TableResizeHandle__<slotName>` keys is resolved by D16.1 deleting the
 * format entirely, and has been removed rather than left pointing at a retired convention.
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
  state.root.className = clsx(styles.root, 'group/fui-table-resize-handle', state.root.className);

  return state;
};
