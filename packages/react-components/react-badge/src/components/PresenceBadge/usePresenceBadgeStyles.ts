import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import type { PresenceBadgeState, PresenceBadgeStatus } from './PresenceBadge.types';

export const presenceBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-PresenceBadge',
  icon: 'fui-PresenceBadge__icon',
};

const getIsBusy = (status: PresenceBadgeStatus): boolean => {
  if (status === 'busy' || status === 'do-not-disturb' || status === 'unknown' || status === 'blocked') {
    return true;
  }

  return false;
};

const useRootClassName = makeResetStyles({
  padding: 0,
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',

  '& span': {
    display: 'flex',
  },
  borderRadius: tokens.borderRadiusCircular,
  backgroundColor: tokens.colorNeutralBackground1,
});

const useStyles = makeStyles({
  statusBusy: {
    color: tokens.colorPaletteRedBackground3,
  },
  statusAway: {
    color: tokens.colorPaletteMarigoldBackground3,
  },
  statusAvailable: {
    color: tokens.colorPaletteLightGreenForeground3,
  },
  statusOffline: {
    color: tokens.colorNeutralForeground3,
  },
  statusOutOfOffice: {
    color: tokens.colorPaletteBerryForeground3,
  },
  outOfOffice: {
    color: tokens.colorNeutralBackground1,
  },
  outOfOfficeAvailable: {
    color: tokens.colorPaletteLightGreenForeground3,
  },
  outOfOfficeBusy: {
    color: tokens.colorPaletteRedBackground3,
  },

  // Icons are not resizeable, and these sizes are currently missing
  // use `!important` to size the currently available icons to the missing ones
  //
  tiny: {
    aspectRatio: '1',
    width: '6px',
    '& svg': {
      width: '6px !important',
      height: '6px !important',
    },
  },
  large: {
    aspectRatio: '1',
    width: '20px',
    '& svg': {
      width: '20px !important',
      height: '20px !important',
    },
  },
  extraLarge: {
    aspectRatio: '1',
    width: '28px',
    '& svg': {
      width: '28px !important',
      height: '28px !important',
    },
  },
});

/**
 * Applies style classnames to slots
 */
export const usePresenceBadgeStyles_unstable = (state: PresenceBadgeState): PresenceBadgeState => {
  const rootClassName = useRootClassName();
  const styles = useStyles();
  const isBusy = getIsBusy(state.status);
  state.root.className = mergeClasses(
    presenceBadgeClassNames.root,
    rootClassName,
    isBusy && styles.statusBusy,
    state.status === 'away' && styles.statusAway,
    state.status === 'available' && styles.statusAvailable,
    state.status === 'offline' && styles.statusOffline,
    state.status === 'out-of-office' && styles.statusOutOfOffice,
    state.outOfOffice && styles.outOfOffice,
    state.outOfOffice && state.status === 'available' && styles.outOfOfficeAvailable,
    state.outOfOffice && isBusy && styles.outOfOfficeBusy,
    state.outOfOffice && state.status === 'away' && styles.statusOutOfOffice,
    state.outOfOffice && state.status === 'offline' && styles.statusOffline,
    state.outOfOffice && state.status === 'out-of-office' && styles.statusOutOfOffice,
    state.size === 'tiny' && styles.tiny,
    state.size === 'large' && styles.large,
    state.size === 'extra-large' && styles.extraLarge,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(presenceBadgeClassNames.icon, state.icon.className);
  }

  return state;
};
