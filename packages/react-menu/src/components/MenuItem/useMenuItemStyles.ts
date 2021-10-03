import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import type { MenuItemState } from './MenuItem.types';

const useStyles = makeStyles({
  focusIndicator: theme => createFocusOutlineStyle(theme),
  root: theme => ({
    borderRadius: theme.borderRadiusMedium,
    position: 'relative',
    color: theme.colorNeutralForeground1,
    backgroundColor: theme.colorNeutralBackground1,
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSizeBase300,
    cursor: 'pointer',
    gap: '4px',

    ':hover': {
      backgroundColor: theme.colorNeutralBackground1Hover,
      color: theme.colorNeutralForeground2Hover,
    },

    userSelect: 'none',
  }),
  content: {
    paddingLeft: '2px',
    paddingRight: '2px',
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  secondaryContent: theme => ({
    paddingLeft: '2px',
    paddingRight: '2px',
    color: theme.colorNeutralForeground3,
    ':hover': {
      color: theme.colorNeutralForeground3Hover,
    },
    ':focus': {
      color: theme.colorNeutralForeground3Hover,
    },
  }),
  icon: {
    width: '20px',
    height: '20px',
  },
  submenuIndicator: {
    width: '20px',
    height: '20px',
  },
  disabled: theme => ({
    color: theme.colorNeutralForegroundDisabled,
    ':hover': {
      color: theme.colorNeutralForegroundDisabled,
    },

    ':focus': {
      color: theme.colorNeutralForegroundDisabled,
    },
  }),
});

/** Applies style classnames to slots */
export const useMenuItemStyles = (state: MenuItemState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    styles.root,
    styles.focusIndicator,
    state.disabled && styles.disabled,
    state.root.className,
  );
  state.content.className = mergeClasses(styles.content, state.content.className);
  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      !state.disabled && styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(styles.icon, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(styles.submenuIndicator, state.submenuIndicator.className);
  }
};
