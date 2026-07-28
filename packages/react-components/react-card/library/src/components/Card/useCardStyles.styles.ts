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
import type { CardSlots, CardState } from './Card.types';

import styles from './Card.module.css';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardClassNames: SlotClassNames<CardSlots> = {
  root: 'fui-Card',
  floatingAction: 'fui-Card__floatingAction',
  checkbox: 'fui-Card__checkbox',
};

/**
 * CSS variable names used internally for uniform styling in Card.
 *
 * The two names are now written literally in Card.module.css (CSS cannot read a JS
 * constant); this object stays exported because it is public API — consumers set
 * `--fui-Card--size` / `--fui-Card--border-radius` through it.
 */
export const cardCSSVars = {
  cardSizeVar: '--fui-Card--size',
  cardBorderRadiusVar: '--fui-Card--border-radius',
};

/**
 * `appearance` is a "look" enum, so it stays a module class lookup rather than a
 * data-attribute variant (DECISIONS.md D3 — the same call react-button made). One class
 * per value carries FOUR mergeClasses arguments, each in its own block inside
 * Card.module.css: the base appearance (#5), the interactive variant (#7), the selected
 * variant (#8) and — for `outline` only — the disabled override (#13).
 */
const appearanceClassNames: Record<CardState['appearance'], string> = {
  filled: styles.filled,
  'filled-alternative': styles.filledAlternative,
  outline: styles.outline,
  subtle: styles.subtle,
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`). Every name already
 * exists there; this conversion adds none.
 *
 * `data-orientation` and `data-size` are the two design props (always stamped). The other
 * three are PRESENCE flags written `flag || undefined` so React omits them entirely —
 * `false` would render `data-x="false"` and still match `[data-x]`.
 *
 * `data-interactive` carries the `!disabled && (interactive || selectable)` union the
 * Griffel hook computed as `isSelectableOrInteractive`. Per the cookbook's boolean-pair
 * rule it rides ONE attribute rather than two: neither half of the union gates a slice on
 * its own, exactly the shape ListItem introduced the `interactive` variant for.
 *
 * `data-disabled` rather than the `aria-disabled` Card already renders: the catalog's
 * `disabled` variant deliberately does not match `[aria-disabled='true']` (that widening
 * is `disabled-control`, for hidden form controls), so the explicit attribute is what
 * keeps the gate 1:1 with the Griffel `state.disabled &&`.
 */
type CardRootDataAttributes = {
  'data-orientation': CardState['orientation'];
  'data-size': CardState['size'];
  'data-interactive'?: true;
  'data-selected'?: true;
  'data-disabled'?: true;
};

/**
 * Apply styling to the Card slots based on the state.
 */
export const useCardStyles_unstable = (state: CardState): CardState => {
  const isSelectableOrInteractive = !state.disabled && (state.interactive || state.selectable);

  /*
   * The focus ring is a THREE-way choice, not a boolean, so it stays a module class
   * lookup (react-text's `.nowrap` / `.truncate` precedent) instead of an attribute:
   *   disabled                    → no ring at all
   *   selectable && selectFocused → the `focus-within` ring (the checkbox holds focus)
   *   selectable && !selectFocused→ no ring
   *   otherwise                   → the `focus` ring
   * Identical branch order to the Griffel hook's `React.useMemo`, which is dropped
   * because the result is now a plain string constant lookup with nothing to memoise.
   */
  let focusedClassName = '';
  if (!state.disabled) {
    if (state.selectable) {
      focusedClassName = state.selectFocused ? styles.selectableFocused : '';
    } else {
      focusedClassName = styles.focused;
    }
  }

  const root = state.root as CardState['root'] & CardRootDataAttributes;

  root['data-orientation'] = state.orientation;
  root['data-size'] = state.size;
  root['data-interactive'] = isSelectableOrInteractive || undefined;
  root['data-selected'] = state.selected || undefined;
  root['data-disabled'] = state.disabled || undefined;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in Card.module.css and by
  // block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the 13 mergeClasses() arguments this replaces, including why
  // everything Card writes onto CardPreview / CardHeader / CardFooter / Text sits at
  // `fui.components.l2`.
  //
  // The state mutations here (and the data-attribute assignments above) are preserved
  // deliberately: DECISIONS.md D14 defers the pure-builder rewrite to a single Phase 3
  // sweep.
  state.root.className = clsx(
    cardClassNames.root,
    styles.root,
    appearanceClassNames[state.appearance],
    focusedClassName,
    state.root.className,
  );

  if (state.floatingAction) {
    state.floatingAction.className = clsx(
      cardClassNames.floatingAction,
      styles.floatingAction,
      state.floatingAction.className,
    );
  }

  if (state.checkbox) {
    state.checkbox.className = clsx(cardClassNames.checkbox, styles.checkbox, state.checkbox.className);
  }

  return state;
};
