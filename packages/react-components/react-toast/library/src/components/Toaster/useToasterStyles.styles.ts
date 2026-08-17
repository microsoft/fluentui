import { clsx } from 'clsx';
import type { ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, getPositionStyles } from '../../state/index';

import styles from './Toaster.module.css';

/**
 * Toaster's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * The class lands on EVERY rendered position container, not on one element — `ToasterSlots`
 * declares a single `root` whose props map identically onto the `<div>` rendered for each
 * occupied toast position (see the slot type's own comment). A selector built from this
 * constant therefore matches one element per occupied position, exactly as `fui-Toaster` did.
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
 */
export const toasterClassNames: { root: string } = {
  root: 'group/fui-toaster',
};

/**
 * Apply styling to the Toaster slots based on the state
 */
export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const className = clsx(styles.root, toasterClassNames.root, state.inline && styles.inline, state.root.className);

  // Per-position placement stays INLINE STYLE: `getPositionStyles` computes `top`/`bottom` and
  // a direction-aware `left`/`right` from the runtime `dir` and `offset` props, which no
  // stylesheet can express. The cookbook's runtime-value rule keeps this JS unchanged; only
  // the class composition above was converted.
  //
  // The state mutations below are preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  if (state.bottomStart) {
    state.bottomStart.className = className;
    state.bottomStart.style ??= {};
    Object.assign(state.bottomStart.style, getPositionStyles(TOAST_POSITIONS.bottomStart, state.dir, state.offset));
  }

  if (state.bottomEnd) {
    state.bottomEnd.className = className;
    state.bottomEnd.style ??= {};
    Object.assign(state.bottomEnd.style, getPositionStyles(TOAST_POSITIONS.bottomEnd, state.dir, state.offset));
  }

  if (state.topStart) {
    state.topStart.className = className;
    state.topStart.style ??= {};
    Object.assign(state.topStart.style, getPositionStyles(TOAST_POSITIONS.topStart, state.dir, state.offset));
  }

  if (state.topEnd) {
    state.topEnd.className = className;
    state.topEnd.style ??= {};
    Object.assign(state.topEnd.style, getPositionStyles(TOAST_POSITIONS.topEnd, state.dir, state.offset));
  }

  if (state.top) {
    state.top.className = className;
    state.top.style ??= {};
    Object.assign(state.top.style, getPositionStyles(TOAST_POSITIONS.top, state.dir, state.offset));
  }

  if (state.bottom) {
    state.bottom.className = className;
    state.bottom.style ??= {};
    Object.assign(state.bottom.style, getPositionStyles(TOAST_POSITIONS.bottom, state.dir, state.offset));
  }

  return state;
};
