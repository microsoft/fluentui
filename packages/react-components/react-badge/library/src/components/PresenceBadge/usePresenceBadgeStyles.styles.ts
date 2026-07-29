import { clsx } from 'clsx';
import type { PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';

import styles from './PresenceBadge.module.css';

/**
 * Public identity classes for PresenceBadge.
 *
 * @deprecated for styling. The only supported way to style a Fluent component's internals is
 * the per-slot `className` props. `root` is retained as this component's public identity
 * class — the Tailwind named-group marker (DECISIONS.md D15.1 / D16.5) — usable both as a
 * selector and as a `group-*` variant target. The BEM statics (`fui-PresenceBadge`,
 * `fui-PresenceBadge__icon`) are no longer rendered and the per-slot keys are gone; there is
 * no public class-name handle on component internals.
 *
 * The marker token contains a `/`. That is legal inside a class TOKEN but terminates the
 * name inside a SELECTOR, so `'.' + presenceBadgeClassNames.root` is an invalid selector even
 * though it type-checks. Use `fuiSelector(presenceBadgeClassNames.root)` from
 * `@fluentui/react-utilities`.
 */
export const presenceBadgeClassNames: { root: string } = {
  root: 'group/fui-presence-badge',
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

  // Unconditional module class FIRST, then the named group marker — the marker must never
  // be `classList[0]` (nwsapi's `:scope` polyfill throws on it under jsdom; DECISIONS.md
  // D15.1 / D16.2) — with the consumer className last. `styles.root` is unconditional and
  // clsx never drops it, so index 0 is always the hashed, selector-safe module class; it is
  // what keeps the marker safe now that the `fui-PresenceBadge` static is gone. The marker
  // is a literal,
  // unhashed, GLOBAL token: it is the only handle by which another module — in this package
  // or any other — can style an element from this PresenceBadge's state, because
  // `styles.root` is hashed and unaddressable from outside this file. No state mirror is
  // needed: `data-size` is already stamped on this very element above (DECISIONS.md D15,
  // Tier 0).
  //
  // Cascade priority is decided by the `@layer fui.*` order in PresenceBadge.module.css,
  // not by the order of these arguments — see that file's header for the mapping back to
  // the mergeClasses() argument order this replaces, the arg-12 inversion, and the
  // probe-verified removal of the six `!important` declarations.
  //
  // The conditions below are byte-for-byte the ones Griffel used; only `styles.tiny` /
  // `.large` / `.extraLarge` moved out of JS and onto the `data-size` attribute above.
  // The module locals are lowercase-kebab (`status-busy`, not `statusBusy`) — the generated
  // ident alphabet is all-lowercase, see scripts/css-modules/ident.js — so they are read
  // with bracket access rather than dot access.
  state.root.className = clsx(
    styles.root,
    'group/fui-presence-badge',
    isBusy && styles['status-busy'],
    status === 'away' && styles['status-away'],
    status === 'available' && styles['status-available'],
    status === 'offline' && styles['status-offline'],
    status === 'out-of-office' && styles['status-out-of-office'],
    status === 'unknown' && styles['status-unknown'],
    outOfOffice && styles['out-of-office'],
    outOfOffice && status === 'available' && styles['out-of-office-available'],
    outOfOffice && isBusy && styles['out-of-office-busy'],
    outOfOffice &&
      (status === 'out-of-office' || status === 'away' || status === 'offline') &&
      styles['out-of-office-status'],
    outOfOffice && status === 'unknown' && styles['out-of-office-unknown'],
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(styles.icon, state.icon.className);
  }

  return state;
};
