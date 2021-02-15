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
      backgroundColor: theme.alias.color.brand.brandBackground,
      borderColor: theme.alias.color.brand.brandBackground,
      color: theme.global.color.white,
      fontWeight: theme.global.type.fontWeights.semibold,
      borderWidth: '1px',
      borderStyle: 'solid',
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
      minWidth: '4px',
      height: '16px',
      paddingRight: '6px',
      paddingLeft: '6px',
      gap: '4px',
      fontSize: '8px',
    }),
  ],
  [
    s => s.size === 'medium',
    theme => ({
      height: '20px',
      minWidth: '4px',
      gap: '4px',
      paddingRight: '8px',
      paddingLeft: '8px',
      fontSize: '12px',
    }),
  ],
  [
    s => s.size === 'large',
    theme => ({
      minWidth: '8px',
      height: '24px',
      paddingRight: '8px',
      paddingLeft: '8px',
      fontSize: '12px',
      gap: '6px',
    }),
  ],
  [
    s => s.size === 'larger' || s.size === 'largest',
    theme => ({
      minWidth: '8px',
      height: '32px',
      paddingRight: '12px',
      paddingLeft: '12px',
      gap: '6px',
      fontSize: '12px',
      border: '2px',
    }),
  ],
  [s => s.shape === 'circular', theme => ({ borderRadius: theme.global.borderRadius.circular })],
  [s => s.shape === 'rounded', theme => ({ borderRadius: theme.global.borderRadius.medium })],
  [
    s => s.shape === 'rounded' && (s.size === 'small' || s.size === 'smaller' || s.size === 'smallest'),
    theme => ({ borderRadius: theme.global.borderRadius.small }),
  ],
  [
    s => s.appearance === 'ghost',
    theme => ({
      background: 'transparent',
      border: 'none',
      color: theme.alias.color.brand.brandBackground,
    }),
  ],
  [
    s => s.appearance === 'outline',
    theme => ({
      background: 'transparent',
      borderColor: theme.alias.color.brand.brandBackground,
      color: theme.alias.color.brand.brandBackground,
    }),
  ],
  [
    s => s.appearance === 'tint',
    theme => ({
      background: theme.global.palette.brand.tint60,
      color: theme.global.palette.brand.shade40,
      border: 'none',
    }),
  ],
]);

/**
 * Styles for the icon slot
 */
export const useIconStyles = makeStyles<BadgeState>([
  [
    s => !s.children,
    () => ({
      position: 'absolute',
    }),
  ],
]);

/** Applies style classnames to slots */
export const useBadgeStyles = (state: BadgeState) => {
  state.className = ax(useRootStyles(state), state.className);
  const iconClassName = useIconStyles(state);

  if (state.icon) {
    state.icon.className = ax(iconClassName, state.icon.className);
  }

  return state;
};
