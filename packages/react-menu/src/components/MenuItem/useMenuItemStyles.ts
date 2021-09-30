import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { createFocusIndicatorStyleRule } from '@fluentui/react-tabster';
import type { MenuItemState } from './MenuItem.types';

const useStyles = makeStyles({
  focusIndicator: createFocusIndicatorStyleRule(theme => ({
    outline: '2px solid transparent',
    borderColor: 'transparent',
    boxShadow: `
      0 0 0 ${theme.global.strokeWidth.thick} ${theme.alias.color.neutral.strokeFocus2}
    `,
    zIndex: 1,
  })),
  root: theme => ({
    borderRadius: theme.global.borderRadius.medium,
    color: theme.alias.color.neutral.neutralForeground2,
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.global.type.fontSizes.base[300],
    cursor: 'pointer',
    gap: '4px',

    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForeground2Hover,
    },

    ':focus': {
      color: theme.alias.color.neutral.neutralForeground2Hover,
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
    color: theme.alias.color.neutral.neutralForeground3,
    ':hover': {
      color: theme.alias.color.neutral.neutralForeground3Hover,
    },
    ':focus': {
      color: theme.alias.color.neutral.neutralForeground3Hover,
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
    backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
    color: theme.alias.color.neutral.neutralForegroundDisabled,
    ':hover': {
      backgroundColor: theme.alias.color.neutral.neutralBackgroundDisabled,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
    },

    ':focus': {
      backgroundColor: theme.alias.color.neutral.neutralBackground1Hover,
      color: theme.alias.color.neutral.neutralForegroundDisabled,
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
