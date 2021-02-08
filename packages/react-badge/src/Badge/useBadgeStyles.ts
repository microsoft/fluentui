import { makeStyles, ax } from '@fluentui/react-make-styles';
import { BadgeState } from './Badge.types';

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles<BadgeState>([[null, theme => ({})]]);

/** Applies style classnames to slots */
export const useBadgeStyles = (state: BadgeState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);
};
