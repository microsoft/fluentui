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
import type { TagPickerButtonState } from './TagPickerButton.types';

import styles from './TagPickerButton.module.css';

/**
 * Public identity class for TagPickerButton.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as the component's public identity class
 * — the Tailwind named-group marker (DECISIONS.md D15.1) — usable both as a selector and as a
 * `group-*` variant target.
 *
 * The value is a class TOKEN, not a selector — `'.' + tagPickerButtonClassNames.root` is
 * invalid CSS, because the `/` must be escaped in a selector. Use
 * `fuiSelector(tagPickerButtonClassNames.root)` from `@fluentui/react-utilities`.
 */
export const tagPickerButtonClassNames: { root: string } = {
  root: 'group/fui-tag-picker-button',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a small ENUM scale, so it takes the catalog's `size-*` variants (DECISIONS.md D3)
 * rather than a class per step. `hasSelectedOption` gets no attribute: it toggles one module
 * class on this same element and no descendant selector reads it (DECISIONS.md D15.6).
 */
type TagPickerButtonRootDataAttributes = {
  'data-size': TagPickerButtonState['size'];
};

/**
 * Apply styling to the PickerButton slots based on the state
 */
export const useTagPickerButtonStyles_unstable = (state: TagPickerButtonState): TagPickerButtonState => {
  const root = state.root as TagPickerButtonState['root'] & TagPickerButtonRootDataAttributes;

  root['data-size'] = state.size;

  // `styles.root` first — hashed, unconditional and selector-safe — then the named group
  // marker, which must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1/D16.2) — with the consumer className last. The `fui-TagPickerButton`
  // BEM static that used to lead this list is gone (D16.1); the marker is TagPickerButton's sole
  // public identity class now.
  //
  // Cascade priority is decided by the `@layer fui.*` order and by block order inside
  // TagPickerButton.module.css, not by the order of these arguments — in particular
  // `.visually-hidden` is written after the size block there so its `margin`/`padding`
  // shorthands still cancel the size padding, as the later mergeClasses argument did.

  state.root.className = clsx(
    styles.root,
    'group/fui-tag-picker-button',
    state.hasSelectedOption && styles['visually-hidden'],
    state.root.className,
  );

  return state;
};
