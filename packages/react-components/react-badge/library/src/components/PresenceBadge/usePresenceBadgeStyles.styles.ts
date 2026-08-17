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
 * Data attributes rendered on the root slot and matched by the shared `@custom-variant` catalog in
 * `@fluentui/react-tailwind-theme` (`css/variants.css`).
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

  // Module class FIRST (the group marker must never be classList[0] — nwsapi’s :scope
  // polyfill throws on the `/`), consumer className LAST. D15.1 / D16.2.
  state.root.className = clsx(
    styles.root,
    presenceBadgeClassNames.root,
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
