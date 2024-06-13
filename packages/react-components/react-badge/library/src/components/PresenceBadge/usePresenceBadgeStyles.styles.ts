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
  if (status === 'busy' || status === 'do-not-disturb' || status === 'blocked') {
    return true;
  }

  return false;
};

const useRootClassName = makeResetStyles({
  display: 'inline-flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',

  borderRadius: `var(--ctrl-token-PresenceBadge-449, var(--semantic-token-PresenceBadge-450, ${tokens.borderRadiusCircular}))`,
  backgroundColor: `var(--ctrl-token-PresenceBadge-451, var(--semantic-token-PresenceBadge-452, ${tokens.colorNeutralBackground1}))`,

  // The background color bleeds around the edge of the icon due to antialiasing on the svg and element background.
  // Since all presence icons have a border around the edge that is at least 1px wide*, we can inset the background
  // using padding and backgroundClip. The icon has margin: -1px to account for the padding.
  // (* except size="tiny", where backgroundClip is unset)
  padding: '1px',
  backgroundClip: 'content-box',
});

const useIconClassName = makeResetStyles({
  display: 'flex',
  margin: '-1px',
});

const useStyles = makeStyles({
  statusBusy: {
    color: `var(--ctrl-token-PresenceBadge-453, var(--semantic-token-PresenceBadge-454, ${tokens.colorPaletteRedBackground3}))`,
  },
  statusAway: {
    color: `var(--ctrl-token-PresenceBadge-455, var(--semantic-token-PresenceBadge-456, ${tokens.colorPaletteMarigoldBackground3}))`,
  },
  statusAvailable: {
    color: `var(--ctrl-token-PresenceBadge-457, var(--semantic-token-PresenceBadge-458, ${tokens.colorPaletteLightGreenForeground3}))`,
  },
  statusOffline: {
    color: `var(--ctrl-token-PresenceBadge-459, var(--semantic-token-PresenceBadge-460, ${tokens.colorNeutralForeground3}))`,
  },
  statusOutOfOffice: {
    color: `var(--ctrl-token-PresenceBadge-461, var(--semantic-token-PresenceBadge-462, ${tokens.colorPaletteBerryForeground3}))`,
  },
  statusUnknown: {
    color: `var(--ctrl-token-PresenceBadge-463, var(--semantic-token-PresenceBadge-464, ${tokens.colorNeutralForeground3}))`,
  },
  outOfOffice: {
    color: `var(--ctrl-token-PresenceBadge-465, var(--semantic-token-PresenceBadge-466, ${tokens.colorNeutralBackground1}))`,
  },
  outOfOfficeAvailable: {
    color: `var(--ctrl-token-PresenceBadge-467, var(--semantic-token-PresenceBadge-468, ${tokens.colorPaletteLightGreenForeground3}))`,
  },
  outOfOfficeBusy: {
    color: `var(--ctrl-token-PresenceBadge-469, var(--semantic-token-PresenceBadge-470, ${tokens.colorPaletteRedBackground3}))`,
  },
  outOfOfficeUnknown: {
    color: `var(--ctrl-token-PresenceBadge-471, var(--semantic-token-PresenceBadge-472, ${tokens.colorNeutralForeground3}))`,
  },

  // Icons are not resizeable, and these sizes are currently missing
  // use `!important` to size the currently available icons to the missing ones
  //
  tiny: {
    aspectRatio: '1',
    width: '6px',
    backgroundClip: 'unset', // tiny icons have a border less than 1px wide, and can't use the backgroundClip fix
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
  'use no memo';

  const rootClassName = useRootClassName();
  const iconClassName = useIconClassName();
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
    state.status === 'unknown' && styles.statusUnknown,
    state.outOfOffice && styles.outOfOffice,
    state.outOfOffice && state.status === 'available' && styles.outOfOfficeAvailable,
    state.outOfOffice && isBusy && styles.outOfOfficeBusy,
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
    state.icon.className = mergeClasses(presenceBadgeClassNames.icon, iconClassName, state.icon.className);
  }

  return state;
};
