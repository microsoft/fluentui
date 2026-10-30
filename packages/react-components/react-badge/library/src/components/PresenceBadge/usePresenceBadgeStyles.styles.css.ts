import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import styles from './PresenceBadge.module.css';
import type { PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';

export const presenceBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-PresenceBadge',
  icon: 'fui-PresenceBadge__icon',
};

const isBusy = (status: PresenceBadgeStatus) =>
  status === 'busy' || status === 'do-not-disturb' || status === 'blocked';

export const usePresenceBadgeStyles_unstable = (state: PresenceBadgeState): PresenceBadgeState => {
  const busy = isBusy(state.status);

  state.root.className = clsx(
    presenceBadgeClassNames.root,
    styles.root,
    busy && styles.statusBusy,
    state.status === 'away' && styles.statusAway,
    state.status === 'available' && styles.statusAvailable,
    state.status === 'offline' && styles.statusOffline,
    state.status === 'out-of-office' && styles.statusOutOfOffice,
    state.status === 'unknown' && styles.statusUnknown,
    state.outOfOffice && styles.outOfOffice,
    state.outOfOffice && state.status === 'available' && styles.outOfOfficeAvailable,
    state.outOfOffice && busy && styles.outOfOfficeBusy,
    state.outOfOffice &&
      (state.status === 'out-of-office' || state.status === 'away' || state.status === 'offline') &&
      styles.statusOutOfOffice,
    state.outOfOffice && state.status === 'unknown' && styles.outOfOfficeUnknown,
    state.size === 'tiny' && styles.tiny,
    state.size === 'large' && styles.large,
    state.size === 'extra-large' && styles.extraLarge,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = clsx(presenceBadgeClassNames.icon, styles.icon, state.icon.className);
  }

  return state;
};
