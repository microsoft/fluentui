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
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

import styles from './CardHeader.module.css';

/**
 * Static CSS class names used internally for the component slots.
 */
export const cardHeaderClassNames: SlotClassNames<CardHeaderSlots> = {
  root: 'fui-CardHeader',
  image: 'fui-CardHeader__image',
  header: 'fui-CardHeader__header',
  description: 'fui-CardHeader__description',
  action: 'fui-CardHeader__action',
};

/**
 * CSS variable names used internally for uniform styling in CardHeader.
 */
export const cardHeaderCSSVars = {
  cardHeaderGapVar: '--fui-CardHeader--gap',
};

/**
 * The two mutually exclusive box models the Griffel source expressed as `useStylesGrid`
 * and `useStylesFlex`, kept as class maps because their gate — "does the `description`
 * slot exist" — has no entry in the shared `@custom-variant` catalog and adding one is a
 * cross-package change. See CardHeader.module.css's header for the full rationale.
 *
 * The three `undefined` entries are the Griffel source's EMPTY slices
 * (`useStylesFlex.image` / `.description` / `.action`), which compiled to no class either.
 */
const boxModelClassNames: Record<'grid' | 'flex', Record<keyof CardHeaderSlots, string | undefined>> = {
  grid: {
    root: styles['grid-root'],
    image: styles['grid-image'],
    header: styles['grid-header'],
    description: styles['grid-description'],
    action: styles['grid-action'],
  },
  flex: {
    root: styles['flex-root'],
    image: undefined,
    header: styles['flex-header'],
    description: undefined,
    action: undefined,
  },
};

/**
 * Apply styling to the CardHeader slots based on the state.
 */
export const useCardHeaderStyles_unstable = (state: CardHeaderState): CardHeaderState => {
  const boxModelStyles = state.description ? boxModelClassNames.grid : boxModelClassNames.flex;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in CardHeader.module.css and
  // by block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces, including why
  // the action slot's forced-colors Button/Link rules sit at `fui.components.l2`.
  const getSlotStyles = (slotName: keyof CardHeaderSlots, groupMarker?: string): string =>
    clsx(
      cardHeaderClassNames[slotName],
      groupMarker,
      styles[slotName],
      boxModelStyles[slotName],
      state[slotName]?.className,
    );

  // The state mutations below are preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  //
  // The named group marker is passed for the ROOT slot only, so it lands directly after
  // the static `fui-*` class — never at `classList[0]` — exactly as it does in every
  // other converted hook (DECISIONS.md D15.1). It is written outside `getSlotStyles`
  // rather than as a branch inside it because only this one slot gets a marker: a group
  // cannot style itself, so a marker on `image` / `header` / `description` / `action`
  // would serve nothing but those slots' own descendants. The marker is a literal,
  // unhashed, GLOBAL token — the only handle by which another module can style an element
  // from this header's state, since `styles.*` is hashed and unaddressable from outside
  // this file (DECISIONS.md D15).
  state.root.className = getSlotStyles('root', 'group/fui-card-header');

  if (state.image) {
    state.image.className = getSlotStyles('image');
  }

  if (state.header) {
    state.header.className = getSlotStyles('header');
  }

  if (state.description) {
    state.description.className = getSlotStyles('description');
  }

  if (state.action) {
    state.action.className = getSlotStyles('action');
  }

  return state;
};
