import { clsx } from 'clsx';

import type { DialogActionsState } from './DialogActions.types';

import styles from './DialogActions.module.css';

/**
 * DialogActions' public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 */
export const dialogActionsClassNames: { root: string } = {
  root: 'group/fui-dialog-actions',
};

/**
 * Apply styling to the DialogActions slots based on the state
 */
export const useDialogActionsStyles_unstable = (state: DialogActionsState): DialogActionsState => {
  // ARGUMENT ORDER — `styles.root`, marker, the four conditional module classes in their
  // original mergeClasses order, consumer className (DECISIONS.md D16.2). The unconditional
  // hashed module class leads so the marker is never `classList[0]`: nwsapi's `:scope`
  // polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-dialog-actions` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-DialogActions` static held that position; `styles.root` holds it now.
  //
  // The order of the four conditionals below carries NO cascade meaning any more — the
  // `@layer` order plus the BLOCK order inside DialogActions.module.css decides which of
  // `.fluid-*` and `.grid-position-*` wins the two `grid-column-*` conflicts (DECISIONS.md
  // D2/D7-revision). It is kept identical to the Griffel call purely so the module's mapping
  // table can be read against this file line for line.
  state.root.className = clsx(
    styles.root,
    dialogActionsClassNames.root,
    state.position === 'start' && styles['grid-position-start'],
    state.position === 'end' && styles['grid-position-end'],
    state.fluid && state.position === 'start' && styles['fluid-start'],
    state.fluid && state.position === 'end' && styles['fluid-end'],
    state.root.className,
  );

  return state;
};
