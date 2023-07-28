import { mergeClasses, makeStyles, shorthands } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens } from '@fluentui/react-theme';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

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
  // TODO: this should be extracted to another package
  root: {
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    position: 'relative',
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingRight: '6px',
    paddingLeft: '6px',
    boxSizing: 'border-box',
    minWidth: '128px',
    maxWidth: '300px',
    minHeight: '32px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    fontSize: tokens.fontSizeBase300,
    cursor: 'pointer',
    ...shorthands.gap('4px'),

    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground2Hover,

      [`& .${iconFilledClassName}`]: {
        display: 'inline',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'none',
      },
      [`& .${menuItemClassNames.icon}`]: {
        color: tokens.colorNeutralForeground2BrandSelected,
      },
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
      backgroundColor: tokens.colorNeutralBackground1,
      cursor: 'not-allowed',
      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${menuItemClassNames.icon}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':focus': {
      color: tokens.colorNeutralForegroundDisabled,
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
      ':hover': {
        color: 'GrayText',
        [`& .${menuItemClassNames.icon}`]: {
          color: 'GrayText',
        },
      },
      ':focus': {
        color: 'GrayText',
      },
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
