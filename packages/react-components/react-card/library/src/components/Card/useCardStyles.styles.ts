import { clsx } from 'clsx';
import type { CardState } from './Card.types';

import styles from './Card.module.css';

/**
 * Card's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * DEPRECATED FOR STYLING INTERNALS. The only supported way to style a Fluent component's
 * internals is the per-slot `className` props. `root` is retained because it is still the
 * component's public identity: it is a usable selector and a `group-*` variant target. The
 * `fui-Card` / `fui-Card__<slot>` BEM statics are gone (D16.1), and the type has narrowed from
 * `SlotClassNames<CardSlots>` to `{ root: string }` so that a read of `floatingAction` or
 * `checkbox` is a compile error on the exact line that would otherwise have silently stopped
 * matching.
 *
 * The value is a class TOKEN, not a selector: `/` is legal inside a class name but terminates
 * it in selector position, so `'.' + cardClassNames.root` is invalid CSS. Use
 * `fuiSelector(cardClassNames.root)` from `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately NOT tagged `@deprecated`: the tag propagates to every barrel that re-exports
 * this symbol — this package's three, plus the `@fluentui/react-components` umbrella — and
 * `@typescript-eslint/no-deprecated` then errors on each of those re-export specifiers. The
 * narrowed type is what enforces D16.5; the tag would only buy lint noise.
 */
export const cardClassNames: { root: string } = {
  root: 'group/fui-card',
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
  'filled-alternative': styles['filled-alternative'],
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
      focusedClassName = state.selectFocused ? styles['selectable-focused'] : '';
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

  // Module class first, then the named group marker — the marker must never be
  // `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional, so
  // index 0 is always the hashed, selector-safe class. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this Card's state, because `styles.root` is
  // hashed and unaddressable from outside this file. Card is the best zero-cost
  // demonstration of the capability: its full state (`data-selected`, `data-disabled`,
  // `data-interactive`, `data-orientation`, `data-size`) is already stamped on this very
  // element, so a descendant can read all of it today as
  // `@variant group-selected/fui-card { … }` with no mirroring (DECISIONS.md D15).
  //
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
    styles.root,
    cardClassNames.root,
    appearanceClassNames[state.appearance],
    focusedClassName,
    state.root.className,
  );

  if (state.floatingAction) {
    state.floatingAction.className = clsx(styles['floating-action'], state.floatingAction.className);
  }

  if (state.checkbox) {
    state.checkbox.className = clsx(styles.checkbox, state.checkbox.className);
  }

  return state;
};
