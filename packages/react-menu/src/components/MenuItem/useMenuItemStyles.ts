import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

/**
 * @deprecated Use `menuItemClassNames.root` instead.
 */
export const menuItemClassName = 'fui-MenuItem';
export const menuItemClassNames: SlotClassNames<MenuItemSlots> = {
  root: 'fui-MenuItem',
  icon: 'fui-MenuItem__icon',
  checkmark: 'fui-MenuItem__checkmark',
  submenuIndicator: 'fui-MenuItem__submenuIndicator',
  content: 'fui-MenuItem__content',
  secondaryContent: 'fui-MenuItem__secondaryContent',
};

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
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
  },
  submenuIndicator: {
    width: '20px',
    height: '20px',
    fontSize: '20px',
    lineHeight: 0,
    alignItems: 'center',
    display: 'inline-flex',
    justifyContent: 'center',
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
    menuItemClassNames.root,
    styles.root,
    styles.focusIndicator,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(menuItemClassNames.content, styles.content, state.content.className);
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemClassNames.checkmark, state.checkmark.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemClassNames.secondaryContent,
      !state.disabled && styles.secondaryContent,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemClassNames.icon, styles.icon, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      menuItemClassNames.submenuIndicator,
      styles.submenuIndicator,
      state.submenuIndicator.className,
    );
  }
  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);
};
