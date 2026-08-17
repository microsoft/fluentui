import { clsx } from 'clsx';
import type { CardHeaderSlots, CardHeaderState } from './CardHeader.types';

import styles from './CardHeader.module.css';

/**
 * CardHeader's public identity class — the Tailwind named-group marker
 * (`migration/griffel-to-tailwind/reports/DECISIONS.md`, D15.1 / D16.5).
 *
 * Not for styling internals — use the per-slot `className` props. The value is a class
 * TOKEN, not a selector: build one with `fuiSelector()` from `@fluentui/react-utilities`.
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  const getSlotStyles = (slotName: keyof CardHeaderSlots, groupMarker?: string): string =>
    clsx(styles[slotName], groupMarker, boxModelStyles[slotName], state[slotName]?.className);

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
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
