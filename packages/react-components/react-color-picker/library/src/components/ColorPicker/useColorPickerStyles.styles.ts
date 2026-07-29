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
import type { ColorPickerState } from './ColorPicker.types';

import styles from './ColorPicker.module.css';

/**
 * Public identity class for ColorPicker.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM static (`fui-ColorPicker`) is no longer
 * rendered (DECISIONS.md D16.1).
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + colorPickerClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(colorPickerClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const colorPickerClassNames: { root: string } = {
  root: 'group/fui-color-picker',
};

/**
 * Apply styling to the ColorPicker slots based on the state
 */
export const useColorPickerStyles_unstable = (state: ColorPickerState): ColorPickerState => {
  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last.
  //
  // Cascade priority is decided by the `@layer fui.*` order in ColorPicker.module.css, not
  // by the order of these arguments.
  state.root.className = clsx(styles.root, 'group/fui-color-picker', state.root.className);

  return state;
};
