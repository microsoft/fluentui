import { mergeClasses, makeStyles, shorthands } from '@fluentui/react-make-styles';
import type { PresenceBadgeState } from './PresenceBadge.types';

export const presenceBadgeClassName = 'fui-PresenceBadge';

const useStyles = makeStyles({
  root: theme => ({
    ...shorthands.padding(0),
    display: 'inline-flex',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'center',

    '& span': {
      display: 'flex',
    },
    ...shorthands.borderRadius('50%'),
    backgroundColor: theme.colorNeutralBackground1,
  }),
  statusBusy: theme => ({
    color: theme.colorPaletteRedBackground3,
  }),
  statusAway: theme => ({
    color: theme.colorPaletteMarigoldBackground3,
  }),
  statusAvailable: theme => ({
    color: theme.colorPaletteLightGreenForeground3,
  }),
  statusOffline: theme => ({
    color: theme.colorNeutralForeground3,
  }),
  statusOutOfOffice: theme => ({
    color: theme.colorPaletteBerryForeground3,
  }),
  outOfOffice: theme => ({
    color: theme.colorNeutralBackground1,
  }),
  outOfOfficeAvailable: theme => ({
    color: theme.colorPaletteLightGreenForeground3,
  }),
  outOfOfficeBusy: theme => ({
    color: theme.colorPaletteRedBackground3,
  }),
  outOfOfficeAway: theme => ({
    color: theme.colorPaletteMarigoldBackground3,
  }),

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
export const usePresenceBadgeStyles = (state: PresenceBadgeState): PresenceBadgeState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    presenceBadgeClassName,
    styles.root,
    (state.status === 'busy' || state.status === 'doNotDisturb') && styles.statusBusy,
    state.status === 'away' && styles.statusAway,
    state.status === 'available' && styles.statusAvailable,
    state.status === 'offline' && styles.statusOffline,
    state.status === 'outOfOffice' && styles.statusOutOfOffice,
    state.outOfOffice && styles.outOfOffice,
    state.outOfOffice && state.status === 'available' && styles.outOfOfficeAvailable,
    state.outOfOffice && (state.status === 'busy' || state.status === 'doNotDisturb') && styles.outOfOfficeBusy,
    state.outOfOffice && state.status === 'away' && styles.outOfOfficeAway,
    state.outOfOffice && state.status === 'offline' && styles.statusOffline,
    state.outOfOffice && state.status === 'outOfOffice' && styles.statusOutOfOffice,
    state.size === 'tiny' && styles.tiny,
    state.size === 'large' && styles.large,
    state.size === 'extra-large' && styles.extraLarge,
    state.root.className,
  );

  return state;
};
