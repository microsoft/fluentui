import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { useBadgeStyles } from '../../Badge';
import type { PresenceBadgeState } from './PresenceBadge.types';

const useStyles = makeStyles({
  root: theme => ({
    padding: 0,
    borderWidth: theme.strokeWidthThick,
  }),
  thinBorder: theme => ({
    borderWidth: theme.strokeWidthThin,
  }),
  statusBusy: theme => ({
    backgroundColor: theme.colorPaletteRedBackground3,
    borderColor: theme.colorPaletteRedBackground3,
  }),
  statusAway: theme => ({
    backgroundColor: theme.colorPaletteMarigoldBackground3,
    borderColor: theme.colorPaletteMarigoldBackground3,
  }),
  statusAvailable: theme => ({
    backgroundColor: theme.colorPaletteLightGreenForeground3,
    borderColor: theme.colorPaletteLightGreenForeground3,
  }),
  statusOffline: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorNeutralForeground3,
    borderColor: theme.colorNeutralForeground3,
  }),
  statusOutOfOffice: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
    color: theme.colorPaletteBerryForeground3,
    borderColor: theme.colorPaletteBerryForeground3,
  }),
  outOfOffice: theme => ({
    backgroundColor: theme.colorNeutralBackground1,
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

  return useBadgeStyles(state) as PresenceBadgeState;
};
