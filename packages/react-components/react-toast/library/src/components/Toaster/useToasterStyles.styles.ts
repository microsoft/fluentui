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
import type { ToasterState } from './Toaster.types';
import { TOAST_POSITIONS, getPositionStyles } from '../../state/index';

import styles from './Toaster.module.css';

/**
 * Toaster's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Toaster` BEM static is gone (D16.1), and the type has narrowed from
 * `SlotClassNames<ToasterSlots>` to `{ root: string }`.
 *
 * The class lands on EVERY rendered position container, not on one element — `ToasterSlots`
 * declares a single `root` whose props map identically onto the `<div>` rendered for each
 * occupied toast position (see the slot type's own comment). A selector built from this
 * constant therefore matches one element per occupied position, exactly as `fui-Toaster` did.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + toasterClassNames.root` is invalid CSS. Use
 * `fuiSelector(toasterClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's two, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const toasterClassNames: { root: string } = {
  root: 'group/fui-toaster',
};

/**
 * Apply styling to the Toaster slots based on the state
 */
export const useToasterStyles_unstable = (state: ToasterState): ToasterState => {
  // Module class FIRST, named group marker SECOND, consumer className LAST (DECISIONS.md
  // D16.2). `styles.root` is unconditional, so index 0 of every position container is always
  // the hashed, selector-safe `fuicm-*` token — which is what keeps the marker off
  // `classList[0]`, where nwsapi's `:scope` polyfill would splice its `/` into an invalid
  // selector and throw a render-time `AggregateError` under jsdom (D15.1). The `fui-Toaster`
  // static that used to hold index 0 is gone (D16.1); `styles.inline` could not take its
  // place — it is conditional on `state.inline`.
  //
  // One string, assigned to each occupied position container below: that is what the Griffel
  // hook did, and `ToasterSlots.root`'s own comment is explicit that the root slot maps the
  // same way onto every position `<div>`. The containers are siblings, so no Toaster group
  // ever nests inside another.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Toaster.module.css — in
  // particular `.inline`'s `position: absolute` (l1) over the reset's `fixed` (base) — not by
  // the order of these arguments.
  const className = clsx(styles.root, 'group/fui-toaster', state.inline && styles.inline, state.root.className);

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
