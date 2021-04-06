import { makeStyles, useAx } from '@fluentui/react-make-styles';
import { MenuItemState } from './MenuItem.types';

const useStyles = makeStyles({
  root: theme => ({
    color: theme.alias.color.neutral.neutralForeground1,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    paddingRight: '8px',
    paddingLeft: '12px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.global.type.fontSizes.base[300],
    cursor: 'pointer',

    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },
  }),
  content: {
    marginRight: '8px',
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  secondaryContent: theme => ({
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground3Hover,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground3Hover,
    },
  }),
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  },
  submenuIndicator: {
    width: '20px',
    height: '20px',
  },
  disabled: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },
  }),
});

/** Applies style classnames to slots */
export const useMenuItemStyles = (state: MenuItemState) => {
  const styles = useStyles();
  state.className = useAx(styles.root, state.disabled && styles.disabled, state.className);
  state.content.className = useAx(styles.content, state.content.className);
  if (state.secondaryContent) {
    state.secondaryContent.className = useAx(
      !state.disabled && styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = useAx(styles.icon, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = useAx(styles.submenuIndicator, state.submenuIndicator.className);
  }
};
