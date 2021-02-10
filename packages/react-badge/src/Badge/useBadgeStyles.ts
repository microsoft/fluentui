import { makeStyles, ax } from '@fluentui/react-make-styles';
import { BadgeState } from './Badge.types';

/**
 * Styles for the root slot
 */
export const useRootStyles = makeStyles<BadgeState>([
  [
    null,
    theme => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.global.color.white,
    }),
  ],
  [
    s => s.size === 'smallest',
    theme => ({
      width: '6px',
      height: '6px',
      fontSize: '4px',
    }),
  ],
  [
    s => s.size === 'smaller',
    theme => ({
      width: '10px',
      height: '10px',
      fontSize: '6px',
    }),
  ],
  [
    s => s.size === 'small',
    theme => ({
      width: '16px',
      height: '16px',
      fontSize: '10px',
    }),
  ],
  [
    s => s.size === 'medium',
    theme => ({
      minWidth: '20px',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      border: '1px',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingRight: '8px',
      paddingLeft: '8px',
    }),
  ],
  [
    s => s.size === 'large',
    theme => ({
      width: '24px',
      height: '24px',
      fontSize: '12px',
    }),
  ],
  [
    s => s.size === 'larger',
    theme => ({
      width: '32px',
      height: '32px',
      fontSize: '12px',
    }),
  ],
  [
    s => s.size === 'largest',
    theme => ({
      width: '32px',
      height: '32px',
      fontSize: '12px',
    }),
  ],
  [s => s.circular, theme => ({ borderRadius: theme.global.borderRadius.circular })],
  [s => s.rounded, theme => ({ borderRadius: theme.global.borderRadius.medium })],
  [s => s.status === 'success', theme => ({ backgroundColor: theme.global.palette.green.primary })],
  [s => s.status === 'accent', theme => ({ backgroundColor: theme.global.palette.blue.primary })],
  [s => s.status === 'danger', theme => ({ backgroundColor: theme.global.palette.cranberry.primary })],
  [
    s => s.status === 'warning',
    theme => ({ backgroundColor: theme.global.palette.yellow.primary, color: theme.global.color.black }),
  ],
  [s => s.status === 'severe', theme => ({ backgroundColor: theme.global.palette.darkOrange.primary })],
  [s => s.status === 'important', theme => ({ backgroundColor: theme.global.palette.grey[14] })],
  [
    s => s.status === 'informative',
    theme => ({ backgroundColor: theme.global.palette.grey[92], color: theme.global.palette.grey[38] }),
  ],
  [
    s => s.status === 'subtle',
    theme => ({ backgroundColor: theme.global.color.white, color: theme.global.color.black }),
  ],
]);

/** Applies style classnames to slots */
export const useBadgeStyles = (state: BadgeState) => {
  const rootClassName = useRootStyles(state);

  state.className = ax(rootClassName, state.className);
};
