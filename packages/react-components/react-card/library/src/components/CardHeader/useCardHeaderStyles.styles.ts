import { clsx } from 'clsx';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

import styles from './CardHeader.module.css';

/**
 * CardHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Deprecated for styling internals: the supported way to style a Fluent component is the
 * per-slot `className` props. `root` is retained as the public identity handle.
 *
 * The value is a class TOKEN, not a selector — build one with `fuiSelector()` from
 * `@fluentui/react-utilities` (D16.5).
 *
 * Deliberately untagged: `@deprecated` would propagate to every re-exporting barrel and
 * trip `@typescript-eslint/no-deprecated` at each one. The narrowed type is the contract.
 */
export const cardHeaderClassNames: { root: string } = {
  root: 'group/fui-card-header',
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

  // Module class first, consumer className last. On the root slot the marker is threaded in
  // as argument 2 so it is never `classList[0]` (DECISIONS.md D15.1 / D16.2); `styles.root`
  // is unconditional, so index 0 is always the hashed, selector-safe class. The sub-slots
  // pass no marker, so `styles[slotName]` simply leads there.
  //
  // Cascade priority is decided by the `@layer fui.*` order in CardHeader.module.css and
  // by block order within it, not by the order of these arguments — see that file's header
  // for the mapping back to the mergeClasses() argument order this replaces, including why
  // the action slot's forced-colors Button/Link rules sit at `fui.components.l2`.
  const getSlotStyles = (slotName: keyof CardHeaderSlots, groupMarker?: string): string =>
    clsx(styles[slotName], groupMarker, boxModelStyles[slotName], state[slotName]?.className);

  // The state mutations below are preserved deliberately: DECISIONS.md D14 defers the
  // pure-builder rewrite to a single Phase 3 sweep.
  //
  // The named group marker is passed for the ROOT slot only, so it lands directly after
  // the unconditional module class — never at `classList[0]` — exactly as it does in every
  // other converted hook (DECISIONS.md D15.1 / D16.2). It is written outside `getSlotStyles`
  // rather than as a branch inside it because only this one slot gets a marker: a group
  // cannot style itself, so a marker on `image` / `header` / `description` / `action`
  // would serve nothing but those slots' own descendants. The marker is a literal,
  // unhashed, GLOBAL token — the only handle by which another module can style an element
  // from this header's state, since `styles.*` is hashed and unaddressable from outside
  // this file (DECISIONS.md D15).
  state.root.className = getSlotStyles('root', cardHeaderClassNames.root);

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
