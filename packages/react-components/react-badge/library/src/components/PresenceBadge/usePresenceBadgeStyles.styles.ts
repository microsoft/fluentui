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
import type { BadgeSlots } from '../Badge/Badge.types';
import type { PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';

import styles from './PresenceBadge.module.css';

export const presenceBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-PresenceBadge',
  icon: 'fui-PresenceBadge__icon',
};

const getIsBusy = (status: PresenceBadgeStatus): boolean => {
  if (status === 'busy' || status === 'do-not-disturb' || status === 'blocked') {
    return true;
  }

  return false;
};

/**
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant`
 * catalog in `@fluentui/react-tailwind-theme` (`css/variants.css`).
 *
 * Only `size` rides an attribute. `status` and `outOfOffice` stay module-class branches:
 * the eleven colour slices they select between are resolved by mergeClasses ARGUMENT
 * order, including one slice that is deliberately applied twice at two different ranks
 * (see the INVERSION note in PresenceBadge.module.css). Keeping them as classes preserves
 * that ordering as plain file order and keeps the slice mapping 1:1; expressing it with
 * data-attributes would push five bespoke compound selectors, used by this component
 * alone, into the shared catalog.
 */
type PresenceBadgeRootDataAttributes = {
  'data-size': PresenceBadgeState['size'];
};

/**
 * Applies style classnames to slots
 */
export const usePresenceBadgeStyles_unstable = (state: PresenceBadgeState): PresenceBadgeState => {
  const { outOfOffice, size, status } = state;
  const isBusy = getIsBusy(status);

  const root = state.root as PresenceBadgeState['root'] & PresenceBadgeRootDataAttributes;

  root['data-size'] = size;

  // Static `fui-*` class first (conformance contract), consumer className last.
  // Cascade priority is decided by the `@layer fui.*` order in PresenceBadge.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces, the arg-12 inversion, and the
  // probe-verified removal of the six `!important` declarations.
  //
  // The conditions below are byte-for-byte the ones Griffel used; only `styles.tiny` /
  // `.large` / `.extraLarge` moved out of JS and onto the `data-size` attribute above.
  state.root.className = clsx(
    presenceBadgeClassNames.root,
    styles.root,
    isBusy && styles.statusBusy,
    status === 'away' && styles.statusAway,
    status === 'available' && styles.statusAvailable,
    status === 'offline' && styles.statusOffline,
    status === 'out-of-office' && styles.statusOutOfOffice,
    status === 'unknown' && styles.statusUnknown,
    outOfOffice && styles.outOfOffice,
    outOfOffice && status === 'available' && styles.outOfOfficeAvailable,
    outOfOffice && isBusy && styles.outOfOfficeBusy,
    outOfOffice &&
      (status === 'out-of-office' || status === 'away' || status === 'offline') &&
      styles.outOfOfficeStatus,
    outOfOffice && status === 'unknown' && styles.outOfOfficeUnknown,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(presenceBadgeClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
