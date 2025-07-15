import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { presenceBadgeClassNames, type PresenceBadgeState, type PresenceBadgeStatus } from '@fluentui/react-badge';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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

  borderRadius: semanticTokens.cornerCircular,
  backgroundColor: semanticTokens.statusImportantForeground,

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
    color: semanticTokens._ctrlBadgeStatusBusyTintForeground,
  },
  statusAway: {
    color: semanticTokens.statusAwayForeground,
  },
  statusAvailable: {
    color: semanticTokens._ctrlBadgeStatusAvailableTintForeground,
  },
  statusOffline: {
    color: semanticTokens.statusInformativeTintForeground,
  },
  statusOutOfOffice: {
    color: tokens.colorPaletteBerryForeground3,
  },
  statusUnknown: {
    color: tokens.colorNeutralForeground3,
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
  outOfOfficeUnknown: {
    color: tokens.colorNeutralForeground3,
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
export const useSemanticPresenceBadgeStyles = (_state: unknown): PresenceBadgeState => {
  'use no memo';

  const state = _state as PresenceBadgeState;
  const rootClassName = useRootClassName();
  const iconClassName = useIconClassName();
  const styles = useStyles();
  const isBusy = getIsBusy(state.status);
  state.root.className = mergeClasses(
    state.root.className,
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
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      presenceBadgeClassNames.icon,
      iconClassName,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  return state;
};
