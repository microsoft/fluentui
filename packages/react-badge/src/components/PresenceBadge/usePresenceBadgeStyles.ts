import { ax } from '@fluentui/react-make-styles';
import { PresenceBadgeState } from './PresenceBadge.types';
import { useRootStyles } from '../../Badge';

/**
 * Applies style classnames to slots
 */
export const usePresenceBadgeStyles = (state: PresenceBadgeState) => {
  state.className = ax(useRootStyles(state), state.className);

  return state;
};
