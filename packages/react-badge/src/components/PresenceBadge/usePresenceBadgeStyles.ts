import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { BadgeSlots } from '../Badge/Badge.types';
import type { PresenceBadgeState } from './PresenceBadge.types';

/**
 * @deprecated Use `presenceBadgeClassNames.root` instead.
 */
export const presenceBadgeClassName = 'fui-PresenceBadge';
export const presenceBadgeClassNames: SlotClassNames<BadgeSlots> = {
  root: 'fui-PresenceBadge',
  icon: 'fui-PresenceBadge__icon',
};

const useStyles = makeStyles({
  root: {
    ...shorthands.padding(0),
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',

    '& span': {
      display: 'flex',
    },
    ...shorthands.borderRadius('50%'),
    backgroundColor: tokens.colorNeutralBackground1,
  },
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
  outOfOfficeAway: {
    color: tokens.colorPaletteMarigoldBackground3,
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
  const styles = useStyles();
  state.root.className = mergeClasses(
    presenceBadgeClassNames.root,
    styles.root,
    ['busy', 'doNotDisturb', 'unknown'].includes(state.status) && styles.statusBusy,
    state.status === 'away' && styles.statusAway,
    state.status === 'available' && styles.statusAvailable,
    state.status === 'offline' && styles.statusOffline,
    state.status === 'outOfOffice' && styles.statusOutOfOffice,
    state.outOfOffice && styles.outOfOffice,
    state.outOfOffice && state.status === 'available' && styles.outOfOfficeAvailable,
    state.outOfOffice && ['busy', 'doNotDisturb', 'unknown'].includes(state.status) && styles.outOfOfficeBusy,
    state.outOfOffice && state.status === 'away' && styles.outOfOfficeAway,
    state.outOfOffice && state.status === 'offline' && styles.statusOffline,
    state.outOfOffice && state.status === 'outOfOffice' && styles.statusOutOfOffice,
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
