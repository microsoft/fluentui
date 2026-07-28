'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration, migration/griffel-to-tailwind):
 * unlike react-divider/react-label, this file needs NO `enforce-use-client` suppression and
 * KEEPS its `react-hooks/immutability` disables — it still calls a React hook
 * (`usePopoverSurfaceStyles`, see below), so both rules still apply to it exactly as before.
 * Same split as react-button (Button lost both, ToggleButton kept them) and react-badge
 * (Badge lost both, CounterBadge kept them).
 */

import { clsx } from 'clsx';
import { makeStyles, mergeClasses } from '@griffel/react';
import { typographyStyles } from '@fluentui/react-theme';
import type { InfoButtonSlots, InfoButtonState } from './InfoButton.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

import styles from './InfoButton.module.css';

export const infoButtonClassNames: SlotClassNames<InfoButtonSlots> = {
  root: 'fui-InfoButton',
  // this className won't be used, but it's needed to satisfy the type checker
  popover: 'fui-InfoButton__popover',
  info: 'fui-InfoButton__info',
};

/**
 * Styles for the info slot — deliberately still Griffel.
 *
 * `state.info` renders `@fluentui/react-popover`'s `PopoverSurface`, which has not been
 * converted yet (DECISIONS.md D12 schedules compound components later). Griffel injects its
 * atomics UNLAYERED, so they beat every `@layer fui.*` rule this package could emit
 * (migration/griffel-to-tailwind/reports/pilot-button.md §"The reliance").
 *
 * That is the correct outcome when an UNCONVERTED component styles a converted one — its
 * classes were mergeClasses' last argument, and unlayered reproduces that winner — but it
 * inverts in this direction. PopoverSurface's own `root` slice applies
 * `typographyStyles.body1`; the `smallMedium` slice below applies `caption1`. Today
 * mergeClasses deletes PopoverSurface's losing atomics because this string is its last
 * argument; a layered `.info` module class would instead LOSE to the surviving unlayered
 * atomic, and every small/medium InfoButton popover would silently render at body1
 * (fontSizeBase300/lineHeightBase300) instead of caption1 (fontSizeBase200/lineHeightBase200).
 *
 * So this slot keeps `makeStyles` + `mergeClasses` verbatim and converts together with
 * react-popover. It is the package's whitelisted `@griffel/react` import.
 */
const usePopoverSurfaceStyles = makeStyles({
  base: {
    maxWidth: '264px',
  },
  smallMedium: typographyStyles.caption1,
  large: typographyStyles.body1,
});

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * `size` is a scale prop, so it rides `data-size` rather than a module class
 * (DECISIONS.md D3). `data-open` is a *presence* selector, so the flag is written
 * `open || undefined` — React omits an attribute whose value is `undefined`, whereas
 * `false` would render `data-open="false"` and still match `[data-open]`.
 *
 * `data-open` is stamped rather than reusing the `aria-expanded` PopoverTrigger already
 * writes on this same button: that attribute is explicitly consumer-overridable
 * (react-popover's PopoverTrigger.test.tsx "should allow user to override aria-expanded"),
 * while `state.popover.open` is exactly the boolean the Griffel hook branched on.
 */
type InfoButtonRootDataAttributes = {
  'data-size': InfoButtonState['size'];
  'data-open'?: true;
};

/**
 * Apply styling to the InfoButton slots based on the state
 */
export const useInfoButtonStyles_unstable = (state: InfoButtonState): InfoButtonState => {
  const { size } = state;
  const { open } = state.popover;
  const popoverSurfaceStyles = usePopoverSurfaceStyles();

  const root = state.root as InfoButtonState['root'] & InfoButtonRootDataAttributes;

  // eslint-disable-next-line react-hooks/immutability
  root['data-size'] = size;
  // eslint-disable-next-line react-hooks/immutability
  root['data-open'] = open || undefined;

  // eslint-disable-next-line react-hooks/immutability
  state.info.className = mergeClasses(
    infoButtonClassNames.info,
    popoverSurfaceStyles.base,
    size === 'large' ? popoverSurfaceStyles.large : popoverSurfaceStyles.smallMedium,
    state.info.className,
  );

  // Static `fui-*` class first (conformance contract), then the named group marker — the
  // marker must never be `classList[0]` (nwsapi's `:scope` polyfill throws on it under
  // jsdom; DECISIONS.md D15.1) — with the consumer className last. The marker is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this InfoButton's state, because `styles.root`
  // is hashed and unaddressable from outside this file (DECISIONS.md D15).
  //
  // InfoButton needs no state mirrors: `data-size` and `data-open` are stamped on this very
  // element above, so `@variant group-open/fui-info-button` etc. work as-is (D15.6, Tier 0).
  // The marker rides the `root` slot only — the `info` slot is the still-Griffel
  // PopoverSurface (see the header above) and gets nothing.
  //
  // Cascade priority is decided by the `@layer fui.*` order in InfoButton.module.css, not
  // by the order of these arguments — see that file's header for the mapping back to the
  // mergeClasses() argument order this replaces.
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(infoButtonClassNames.root, 'group/fui-info-button', styles.root, state.root.className);

  return state;
};
