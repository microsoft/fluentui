import { ax, makeStyles } from '@fluentui/react-make-styles';
import { PresenceBadgeState } from './PresenceBadge.types';
import { useBadgeStyles } from '../../Badge';

export const usePresenceBadgeRootStyles = makeStyles<PresenceBadgeState>([
  [
    null,
    {
      padding: 0,
    },
  ],
  [
    s => s.status === 'busy',
    theme => ({
      backgroundColor: theme.global.palette.cranberry.primary,
      borderColor: theme.global.palette.cranberry.primary,
    }),
  ],
  [
    s => s.status === 'away',
    theme => ({
      backgroundColor: theme.global.palette.yellow.primary,
      borderColor: theme.global.palette.yellow.primary,
    }),
  ],
  [
    s => s.status === 'available',
    theme => ({
      backgroundColor: theme.global.palette.lightGreen.primary,
      borderColor: theme.global.palette.lightGreen.primary,
    }),
  ],
  [
    s => s.status === 'offline',
    theme => ({
      backgroundColor: 'transparent',
      color: theme.global.palette.grey[38],
      borderColor: theme.global.palette.grey[38],
    }),
  ],
  [
    s => s.status === 'outOfOffice',
    theme => ({
      backgroundColor: 'transparent',
      color: theme.global.palette.magenta.primary,
      borderColor: theme.global.palette.magenta.primary,
    }),
  ],
  [
    s => s.outOfOffice,
    {
      background: 'transparent',
    },
  ],
  [
    s => s.outOfOffice && s.status === 'available',
    theme => ({
      color: theme.global.palette.lightGreen.primary,
    }),
  ],
  [
    s => s.outOfOffice && s.status === 'busy',
    theme => ({
      color: theme.global.palette.red.primary,
    }),
  ],
  [
    s => s.outOfOffice && s.status === 'away',
    theme => ({
      color: theme.global.palette.yellow.primary,
    }),
  ],
]);

/**
 * Applies style classnames to slots
 */
export const usePresenceBadgeStyles = (state: PresenceBadgeState) => {
  state.className = ax(usePresenceBadgeRootStyles(state), state.className);

  return useBadgeStyles(state);
};
