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
import type { ButtonSlots, ButtonState } from './Button.types';

import styles from './Button.module.css';

export const buttonClassNames: SlotClassNames<ButtonSlots> = {
  root: 'fui-Button',
  icon: 'fui-Button__icon',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Names follow the
 * headless preview's vocabulary (`data-disabled`, `data-disabled-focusable`,
 * `data-icon-only` are the three that `react-headless-components-preview`'s own
 * `useButton` already stamps — reports/headless-precedent.md).
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-icon-only="false"` and still match
 * `[data-icon-only]`. (The headless preview writes `''` instead of `true` via
 * `stringifyDataAttribute`; both forms match a presence selector — this file follows the
 * `|| undefined` form the react-divider pilot established.)
 *
 * `data-icon-position` is written ONLY when the icon slot exists, so its *presence*
 * doubles as the "has an icon" signal that `rootStyles.smallWithIcon` / `.largeWithIcon`
 * branch on (`icon && size === 'small'`). That is why the icon slot itself carries no
 * data attributes: both its placement and its scale are selected from the root.
 *
 * `data-empty` mirrors `!state.root.children`, the guard on the icon's margin
 * (`!!state.root.children && iconStyles[iconPosition]`). Same attribute the react-divider
 * pilot introduced.
 */
type ButtonRootDataAttributes = {
  'data-size': ButtonState['size'];
  'data-icon-position'?: ButtonState['iconPosition'];
  'data-icon-only'?: true;
  'data-disabled'?: true;
  'data-disabled-focusable'?: true;
  'data-empty'?: true;
};

export const useButtonStyles_unstable = (state: ButtonState): ButtonState => {
  const { appearance, disabled, disabledFocusable, icon, iconOnly, iconPosition, shape, size } = state;

  const root = state.root as ButtonState['root'] & ButtonRootDataAttributes;

  root['data-size'] = size;
  root['data-icon-position'] = icon ? iconPosition : undefined;
  root['data-icon-only'] = iconOnly || undefined;
  root['data-disabled'] = disabled || undefined;
  root['data-disabled-focusable'] = disabledFocusable || undefined;
  root['data-empty'] = !state.root.children || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element
  // from this Button's state, because `styles.root` is hashed and unaddressable from outside
  // this file. Button needs no state mirrors: `data-disabled`, `data-icon-only`,
  // `data-size` and the rest are already stamped on this very element above, so
  // `@variant group-hover/fui-button`, `group-disabled/fui-button` etc. work as-is
  // (DECISIONS.md D15, Tier 0).
  //
  // Only `Button` carries a marker for now. ToggleButton / CompoundButton / MenuButton /
  // SplitButton are still Griffel and get theirs when they convert.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Button.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including the two shape-vs-size
  // `border-radius` inversions.
  //
  // `state.root.className` is also how ToggleButton/CompoundButton/MenuButton/SplitButton
  // reach this slot: each of them runs its own `mergeClasses(...)` FIRST and calls
  // `useButtonStyles_unstable` LAST, so their (unlayered) Griffel atomics arrive here as
  // the trailing argument and keep beating these layered rules — the same winner
  // mergeClasses produced when their string was its last argument.
  state.root.className = clsx(
    'group/fui-button',
    buttonClassNames.root,
    styles.root,
    appearance && styles[appearance],
    styles[shape],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(buttonClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
