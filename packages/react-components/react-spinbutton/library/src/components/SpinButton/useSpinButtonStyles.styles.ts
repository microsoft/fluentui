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
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SpinButtonSlots, SpinButtonState } from './SpinButton.types';

import styles from './SpinButton.module.css';

export const spinButtonClassNames: SlotClassNames<SpinButtonSlots> = {
  root: 'fui-SpinButton',
  input: 'fui-SpinButton__input',
  incrementButton: 'fui-SpinButton__incrementButton',
  decrementButton: 'fui-SpinButton__decrementButton',
};

/**
 * Marks the increment/decrement button that is currently spinning. Not part of the public
 * `spinButtonClassNames` API, but it IS in the rendered DOM and SpinButton.module.css
 * selects it with `:global(.fui-SpinButton__button_active)` — kept as a class rather than
 * converted to a data-attribute so the conversion stays a pure styling change.
 */
const spinButtonExtraClassNames = {
  buttonActive: 'fui-SpinButton__button_active',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All three live on the ROOT even though two of them drive rules on the `input` and button
 * slots: that is the headless preview's convention (every `data-*` it stamps is on the
 * root — reports/headless-precedent.md), and it is what lets SpinButton.module.css reach
 * the inner slots with `& .input` / `& .increment` descendant selectors instead of
 * duplicating the attributes onto every slot.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` mirrors `state.input.disabled`, which the ROOT cannot express natively —
 * the root is a `<span>` and only the inner `<input>` carries the real `disabled`
 * attribute. The two `<button>` slots need no attribute at all: they carry the native
 * `disabled` themselves and key off `:enabled` / `:disabled` through the shared variants.
 */
type SpinButtonRootDataAttributes = {
  'data-size': SpinButtonState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the SpinButton slots based on the state
 */
export const useSpinButtonStyles_unstable = (state: SpinButtonState): SpinButtonState => {
  const { appearance, spinState, size } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root = state.root as SpinButtonState['root'] & SpinButtonRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this SpinButton's state, because `styles.root`
  // is hashed and unaddressable from outside this file. No state mirrors are needed:
  // `data-size`, `data-disabled` and `data-invalid` are already stamped on this very
  // element above, so `@variant group-disabled/fui-spin-button { … }` works as-is
  // (DECISIONS.md D15, Tier 0). `:focus-within` likewise needs no mirror — it is true of
  // this root whenever it is true of the inner `<input>`, so
  // `group-focus-within/fui-spin-button` costs zero JS.
  //
  // Cascade priority is decided by the `@layer fui.*` order in SpinButton.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including the two `invalid` inversions.
  //
  // The `!disabled &&` guards that used to gate `outlineInteractive` /
  // `underlineInteractive` / `filledInteractive` are now `@variant enabled` blocks inside
  // the appearance classes, and `appearance === 'outline' | 'underline'` is the class
  // itself. `styles.medium` and (for the root) `styles.outline`'s rest state are the
  // compiled `{}` slices — nothing to apply, exactly as before.
  state.root.className = clsx(
    spinButtonClassNames.root,
    'group/fui-spin-button',
    styles.root,
    styles[appearance],
    filled && styles.filled,
    state.root.className,
  );

  // Both buttons share the `.button` reset the way mergeClasses handed them the identical
  // reset class; `buttonStyles[appearance]` and the `size === 'small'` padding now reach
  // them from the root (appearance look class + `data-size`).
  state.incrementButton.className = clsx(
    spinButtonClassNames.incrementButton,
    spinState === 'up' && spinButtonExtraClassNames.buttonActive,
    styles.button,
    styles.increment,
    state.incrementButton.className,
  );

  state.decrementButton.className = clsx(
    spinButtonClassNames.decrementButton,
    spinState === 'down' && spinButtonExtraClassNames.buttonActive,
    styles.button,
    styles.decrement,
    state.decrementButton.className,
  );

  state.input.className = clsx(spinButtonClassNames.input, styles.input, state.input.className);

  return state;
};
