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
import type { LabelSlots, LabelState } from './Label.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './Label.module.css';

export const labelClassNames: SlotClassNames<LabelSlots> = {
  root: 'fui-Label',
  required: 'fui-Label__required',
};

/**
 * Data attributes rendered on the Label slots and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides `data-size` rather than a module class
 * (DECISIONS.md D3); `weight` is a look prop and stays a module class (`.semibold`),
 * which also keeps the "regular" default rule-free exactly as the Griffel source was.
 *
 * `data-disabled` is a *presence* selector, so the flag is written `disabled || undefined`
 * — React omits an attribute whose value is `undefined`, whereas `false` would render
 * `data-disabled="false"` and still match `[data-disabled]`.
 *
 * It is stamped on BOTH slots because the single Griffel `disabled` slice was applied to
 * both by mergeClasses; keying the required slot off its own attribute (rather than a
 * descendant selector from the root) keeps `.required` independent of DOM nesting and
 * every selector `:where()`-flat.
 */
type LabelRootDataAttributes = {
  'data-size': LabelState['size'];
  'data-disabled'?: true;
};

type LabelRequiredDataAttributes = {
  'data-disabled'?: true;
};

/**
 * Apply styling to the Label slots based on the state
 */
export const useLabelStyles_unstable = (state: LabelState): LabelState => {
  const { disabled, size, weight } = state;

  const root = state.root as LabelState['root'] & LabelRootDataAttributes;

  root['data-size'] = size;
  root['data-disabled'] = disabled || undefined;

  // Named group marker FIRST, then the static `fui-*` class (conformance contract), with
  // the consumer className last. The marker is a literal, unhashed, GLOBAL token: it is the
  // only handle by which another module — in this package or any other — can style an
  // element from this Label's state, because `styles.root` is hashed and unaddressable from
  // outside this file. Label needs no state mirrors: `data-size` and `data-disabled` are
  // already stamped on this very element above, so `@variant group-disabled/fui-label`
  // works as-is (DECISIONS.md D15, Tier 0).
  //
  // Only the root carries a marker. The `required` slot gets none: a group cannot style
  // itself, and `required` has its own `data-disabled` for its own rules.
  //
  // Cascade priority is decided by the `@layer fui.*` order in Label.module.css, not by
  // the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  state.root.className = clsx(
    'group/fui-label',
    labelClassNames.root,
    styles.root,
    weight === 'semibold' && styles.semibold,
    state.root.className,
  );

  if (state.required) {
    const required = state.required as NonNullable<LabelState['required']> & LabelRequiredDataAttributes;

    required['data-disabled'] = disabled || undefined;

    state.required.className = clsx(labelClassNames.required, styles.required, state.required.className);
  }

  return state;
};
