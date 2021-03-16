import { makeStylesCompat, ax } from '@fluentui/react-make-styles';
import { PresenceBadgeState } from './PresenceBadge.types';
import { useBadgeStyles } from '../../Badge';

export const usePresenceBadgeRootStyles = makeStylesCompat<PresenceBadgeState>([
  [
    null,
    {
      padding: 0,
    },
  ],
  [
    s => s.status === 'busy' || s.status === 'doNotDisturb',
    theme => ({
      backgroundColor: theme.alias.color.red.background3,
      borderColor: theme.alias.color.red.background3,
    }),
  ],
  [
    s => s.status === 'away',
    theme => ({
      backgroundColor: theme.alias.color.marigold.background3,
      borderColor: theme.alias.color.marigold.background3,
    }),
  ],
  [
    s => s.status === 'available',
    theme => ({
      backgroundColor: theme.alias.color.lightGreen.foreground3,
      borderColor: theme.alias.color.lightGreen.foreground3,
    }),
  ],
  [
    s => s.status === 'offline',
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      color: theme.alias.color.neutral.neutralForeground3,
      borderColor: theme.alias.color.neutral.neutralForeground3,
    }),
  ],
  [
    s => s.status === 'outOfOffice',
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
      color: theme.alias.color.berry.foreground3,
      borderColor: theme.alias.color.berry.foreground3,
    }),
  ],
  [
    s => s.outOfOffice,
    theme => ({
      backgroundColor: theme.alias.color.neutral.neutralBackground1,
    }),
  ],
  [
    s => s.outOfOffice && s.status === 'available',
    theme => ({
      color: theme.alias.color.lightGreen.foreground3,
    }),
  ],
  [
    s => s.outOfOffice && (s.status === 'busy' || s.status === 'doNotDisturb'),
    theme => ({
      color: theme.alias.color.red.background3,
    }),
  ],
  [
    s => s.outOfOffice && s.status === 'away',
    theme => ({
      color: theme.alias.color.marigold.background3,
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
