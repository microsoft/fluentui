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
import type { SelectSlots, SelectState } from './Select.types';

import styles from './Select.module.css';

export const selectClassNames: SlotClassNames<SelectSlots> = {
  root: 'fui-Select',
  select: 'fui-Select__select',
  icon: 'fui-Select__icon',
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * All three live on the ROOT even though every rule they drive targets the `select` or
 * `icon` slot: that is the headless preview's convention (every `data-*` it stamps is on
 * the root — reports/headless-precedent.md), and here it is also load-bearing —
 * Select.module.css's header explains why moving `data-invalid` onto the `<select>` would
 * both break the invalid-vs-interactive file-order tie and let the shared `invalid`
 * variant's `:invalid` term fire on a `required` Select the Griffel code never styled.
 *
 * Presence flags are written `flag || undefined`: React omits an attribute whose value is
 * `undefined`, whereas `false` would render `data-invalid="false"` and still match
 * `[data-invalid]`.
 *
 * `data-disabled` mirrors `state.select.disabled`, which the ROOT cannot express natively —
 * the root is a `<span>` and only the inner `<select>` carries the real `disabled`
 * attribute.
 */
type SelectRootDataAttributes = {
  'data-size': SelectState['size'];
  'data-disabled'?: true;
  'data-invalid'?: true;
};

/**
 * Apply styling to the Select slots based on the state
 */
export const useSelectStyles_unstable = (state: SelectState): SelectState => {
  const { size, appearance } = state;
  const disabled = state.select.disabled;
  const invalid = `${state.select['aria-invalid']}` === 'true';

  const root = state.root as SelectState['root'] & SelectRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;
  root['data-invalid'] = invalid || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with the
  // consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the only
  // handle by which another module — in this package or any other — can style an element from
  // this Select's state, because `styles.root` is hashed and unaddressable from outside this
  // file. Select needs no state mirrors: `data-size`, `data-disabled` and `data-invalid` are
  // already stamped on this very element above, so `@variant group-invalid/fui-select`,
  // `group-focus-within/fui-select` etc. work as-is (DECISIONS.md D15, Tier 0 — the optional
  // Tier 2 `data-focused` is deliberately skipped: `:focus-within` on this root already
  // reaches every descendant through the group).
  //
  // Cascade priority is decided by the `@layer fui.*` order and by block order inside
  // Select.module.css, not by the order of these arguments — see that file's header for
  // the mapping back to the mergeClasses() argument order this replaces, including the
  // two inversions (`outlineInteractive`'s hover/active buckets, and the split `invalid`
  // specificity hack).
  //
  // The `!disabled &&` guards that used to gate `outlineInteractive` / `invalid` /
  // `invalidUnderline` are now `@variant enabled` blocks on the root, `disabled` /
  // `disabledUnderline` are `@variant disabled` blocks, and
  // `appearance === 'outline' | 'underline'` is the appearance class itself.
  state.root.className = clsx('group/fui-select', selectClassNames.root, styles.root, state.root.className);

  state.select.className = clsx(selectClassNames.select, styles.select, styles[appearance], state.select.className);

  if (state.icon) {
    state.icon.className = clsx(selectClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
