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
import type { InputSlots, InputState } from './Input.types';

import styles from './Input.module.css';

export const inputClassNames: SlotClassNames<InputSlots> = {
  root: 'fui-Input',
  input: 'fui-Input__input',
  contentBefore: 'fui-Input__contentBefore',
  contentAfter: 'fui-Input__contentAfter',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All five live on the ROOT even though three of them drive rules on the `input` and
 * content slots: that is the headless preview's convention (every `data-*` it stamps is
 * on the root — reports/headless-precedent.md), and it is what lets Input.module.css
 * reach the inner slots with `& .input` / `& .content` descendant selectors instead of
 * duplicating the attributes onto every slot.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` mirrors `state.input.disabled`, which the ROOT cannot express natively —
 * the root is a `<span>` and only the inner `<input>` carries the real `disabled`
 * attribute. The `input` slot's own disabled rules therefore need no attribute at all;
 * they key off native `:disabled` through the shared `disabled` variant.
 */
type InputRootDataAttributes = {
  'data-size': InputState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
  'data-content-before'?: true;
  'data-content-after'?: true;
};

/**
 * Apply styling to the Input slots based on the state
 */
export const useInputStyles_unstable = (state: InputState): InputState => {
  const { size, appearance } = state;
  const disabled = state.input.disabled;
  const invalid = `${state.input['aria-invalid']}` === 'true';
  const filled = appearance.startsWith('filled');

  const root = state.root as InputState['root'] & InputRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;
  root['data-content-before'] = !!state.contentBefore || undefined;
  root['data-content-after'] = !!state.contentAfter || undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Input.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces, including the `filledInteractive`
  // hover-vs-rest inversion.
  //
  // The `!disabled &&` guards that used to gate `outlineInteractive` / `underlineInteractive`
  // / `filledInteractive` are now `@variant enabled` blocks inside the appearance classes,
  // and `appearance === 'outline' | 'underline'` is the class itself. `styles.medium` and
  // (for the root) `styles.outline`'s rest state are the compiled `{}` slices — nothing to
  // apply, exactly as before.
  state.root.className = clsx(
    inputClassNames.root,
    styles.root,
    styles[appearance],
    filled && styles.filled,
    state.root.className,
  );

  state.input.className = clsx(inputClassNames.input, styles.input, state.input.className);

  // Both content slots take the identical class list, the way mergeClasses handed them the
  // identical atomics — one `.content` class covers both.
  if (state.contentBefore) {
    state.contentBefore.className = clsx(inputClassNames.contentBefore, styles.content, state.contentBefore.className);
  }
  if (state.contentAfter) {
    state.contentAfter.className = clsx(inputClassNames.contentAfter, styles.content, state.contentAfter.className);
  }

  return state;
};
