import { ax, makeStaticStyles, makeStyles } from '@fluentui/react-make-styles';
import { AvatarBadgeState } from './AvatarBadge.types';

const useStaticStyles = makeStaticStyles({
  ':root': {
    '--avatar-badge-size': 'var(--avatar-badge-size-small)',
    '--avatar-badge-size-smallest': '6px',
    '--avatar-badge-size-smaller': '8px',
    '--avatar-badge-size-small': '10px',
    '--avatar-badge-size-medium': '16px',
    '--avatar-badge-size-large': '20px',
    '--avatar-badge-size-larger': '24px',
    '--avatar-badge-size-largest': '32px',

    '--avatar-badge-borderRadius': '9999px',

    // TODO this should match the parent's background color
    '--avatar-badge-glowColor': 'var(--siteVariables-colors-white, white)',

    '--avatar-badge-color': 'var(--siteVariables-colors-grey-350, rgb(151, 149, 147))',
    '--avatar-badge-iconColor': 'var(--siteVariables-colors-white, white)',
    '--avatar-badge-error-color': 'var(--siteVariables-colors-red-400, rgb(196, 49, 75))',
    '--avatar-badge-error-iconColor': 'var(--siteVariables-colors-white, white)',
    '--avatar-badge-info-color': 'var(--siteVariables-colors-brand500, rgb(151, 149, 147))',
    '--avatar-badge-info-iconColor': 'var(--siteVariables-colors-white, white)',
    '--avatar-badge-success-color': 'var(--siteVariables-colors-green200, rgb(146, 195, 83))',
    '--avatar-badge-success-iconColor': 'var(--siteVariables-colors-white, white)',
    '--avatar-badge-warning-color': 'var(--siteVariables-colors-yellow-400, rgb(248, 210, 42))',
    '--avatar-badge-warning-iconColor': 'var(--siteVariables-colors-white, white)',
  },
});

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    borderRadius: 'var(--avatar-badge-borderRadius)',
    borderWidth: 'var(--avatar-badge-borderWidth, calc(var(--avatar-badge-size) / 8))',
    borderStyle: 'var(--avatar-badge-borderStyle)',
    borderColor: 'var(--avatar-badge-borderColor)',
    boxShadow: '0 0 0 var(--avatar-badge-glowWidth, calc(var(--avatar-badge-size) / 8)) var(--avatar-badge-glowColor)',
    backgroundColor: 'var(--avatar-badge-color)',
    color: 'var(--avatar-badge-iconColor)',
    width: 'var(--avatar-badge-size)',
    height: 'var(--avatar-badge-size)',
  },
  success: {
    '--avatar-badge-color': 'var(--avatar-badge-success-color)',
    '--avatar-badge-iconColor': 'var(--avatar-badge-success-iconColor)',
  },
  info: {
    '--avatar-badge-color': 'var(--avatar-badge-info-color)',
    '--avatar-badge-iconColor': 'var(--avatar-badge-info-iconColor)',
  },
  warning: {
    '--avatar-badge-color': 'var(--avatar-badge-warning-color)',
    '--avatar-badge-iconColor': 'var(--avatar-badge-warning-iconColor)',
  },
  error: {
    '--avatar-badge-color': 'var(--avatar-badge-error-color)',
    '--avatar-badge-iconColor': 'var(--avatar-badge-error-iconColor)',
  },
  smallest: {
    '--avatar-badge-size': 'var(--avatar-badge-size-smallest)',
  },
  smaller: {
    '--avatar-badge-size': 'var(--avatar-badge-size-smaller)',
  },
  small: {
    '--avatar-badge-size': 'var(--avatar-badge-size-small)',
  },
  medium: {
    '--avatar-badge-size': 'var(--avatar-badge-size-medium)',
  },
  large: {
    '--avatar-badge-size': 'var(--avatar-badge-size-large)',
  },
  larger: {
    '--avatar-badge-size': 'var(--avatar-badge-size-larger)',
  },
  largest: {
    '--avatar-badge-size': 'var(--avatar-badge-size-largest)',
  },
  icon: {
    display: 'flex',
    width: '75%',
    height: '75%',
  },
});

export function useAvatarBadgeStyles(state: AvatarBadgeState): AvatarBadgeState {
  useStaticStyles();
  const styles = useStyles();

  state.className = ax(
    styles.root,
    state.state && state.state !== 'unknown' && styles[state.state],
    state.size && styles[state.size],
    state.className,
  );

  if (state.icon) {
    state.icon.className = ax(styles.icon, state.icon.className);
  }

  return state;
}
