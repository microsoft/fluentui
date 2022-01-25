import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemState } from './MenuItem.types';

export const menuItemClassName = 'fui-MenuItem';

const useStyles = makeStyles({
  focusIndicator: createFocusOutlineStyle(),
  root: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    position: 'relative',
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingRight: '10px',
    paddingLeft: '10px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    fontSize: tokens.fontSizeBase300,
    cursor: 'pointer',
    ...shorthands.gap('4px'),

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground2Hover,
    },

    userSelect: 'none',
  },
  content: {
    paddingLeft: '2px',
    paddingRight: '2px',
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  secondaryContent: {
    paddingLeft: '2px',
    paddingRight: '2px',
    color: tokens.colorNeutralForeground3,
    ':hover': {
      color: tokens.colorNeutralForeground3Hover,
    },
    ':focus': {
      color: tokens.colorNeutralForeground3Hover,
    },
  },
  icon: {
    width: '20px',
    height: '20px',
    fontSize: '20px',
    lineHeight: 0,
  },
  submenuIndicator: {
    width: '20px',
    height: '20px',
    fontSize: '20px',
    lineHeight: 0,
  },
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,
    ':hover': {
      color: tokens.colorNeutralForegroundDisabled,
    },

    ':focus': {
      color: tokens.colorNeutralForegroundDisabled,
    },
  },
});

/** Applies style classnames to slots */
export const useMenuItemStyles_unstable = (state: MenuItemState) => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    menuItemClassName,
    styles.root,
    styles.focusIndicator,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(styles.content, state.content.className);
  }

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
  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);
};
