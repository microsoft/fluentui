import { clsx } from 'clsx';

import type { DialogContentState } from './DialogContent.types';

import styles from './DialogContent.module.css';

/**
 * DialogContent's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. See `dialogSurfaceClassNames` in
 * `../DialogSurface/useDialogSurfaceStyles.styles.ts` for the full rationale, including why
 * this is not tagged `@deprecated`. In short: the `fui-DialogContent` BEM static is gone
 * (D16.1), the type narrowed to `{ root: string }` so per-slot reads are compile errors, and
 * the value is a class TOKEN — use `fuiSelector(dialogContentClassNames.root)` from
 * `@fluentui/react-utilities` to build a selector from it.
 */
export const dialogContentClassNames: { root: string } = {
  root: 'group/fui-dialog-content',
};

/**
 * Apply styling to the DialogContent slots based on the state
 */
export const useDialogContentStyles_unstable = (state: DialogContentState): DialogContentState => {
  // ARGUMENT ORDER — `styles.root`, marker, consumer className (DECISIONS.md D16.2). The
  // unconditional hashed module class leads so the marker is never `classList[0]`: nwsapi's
  // `:scope` polyfill builds its anchor from `escape(element.classList[0])`, and the `/` in
  // `group/fui-dialog-content` survives that escaping into an invalid selector, throwing a
  // render-time `AggregateError` under jsdom (DECISIONS.md D15.1). Before D16 the
  // `fui-DialogContent` static held that position; `styles.root` holds it now.
  state.root.className = clsx(styles.root, dialogContentClassNames.root, state.root.className);

  return state;
};
