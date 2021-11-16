import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import type { PresenceBadgeState } from './PresenceBadge.types';

export const presenceBadgeClassName = 'fui-PresenceBadge';

const useStyles = makeStyles({
  root: theme => ({
    padding: 0,
    borderWidth: theme.strokeWidthThick,
  }),
  thinBorder: theme => ({
    borderWidth: theme.strokeWidthThin,
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
    (state.size === 'tiny' || state.size === 'extra-small') && styles.thinBorder,
    state.root.className,
  );

  return state;
};
