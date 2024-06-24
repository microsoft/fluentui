import { mergeClasses, makeStyles, makeResetStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { tokens, typographyStyles } from '@fluentui/react-theme';
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

const useRootBaseStyles = makeResetStyles({
  borderRadius: tokens.borderRadiusMedium,
  position: 'relative',
  color: tokens.colorNeutralForeground2,
  backgroundColor: tokens.colorNeutralBackground1,
  paddingRight: tokens.spacingVerticalSNudge, // 6px
  paddingLeft: tokens.spacingVerticalSNudge,
  paddingTop: tokens.spacingVerticalSNudge,
  paddingBottom: tokens.spacingVerticalSNudge,
  boxSizing: 'border-box',
  maxWidth: '290px',
  minHeight: '32px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'start',
  fontSize: tokens.fontSizeBase300,
  cursor: 'pointer',
  gap: '4px',

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

  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    color: tokens.colorNeutralForeground2Pressed,
  },

  // High contrast styles
  '@media (forced-colors: active)': {
    ':hover': {
      backgroundColor: 'Canvas',
      borderColor: 'Highlight',
      color: 'Highlight',
    },
    ...createFocusOutlineStyle({ style: { outlineColor: 'Highlight' } }),
  },

  userSelect: 'none',
  ...createFocusOutlineStyle(),
});

const useContentBaseStyles = makeResetStyles({
  paddingLeft: '2px',
  paddingRight: '2px',
  backgroundColor: 'transparent',
  flexGrow: 1,
});

const useSecondaryContentBaseStyles = makeResetStyles({
  paddingLeft: '2px',
  paddingRight: '2px',
  ...typographyStyles.caption1,
  lineHeight: tokens.lineHeightBase300,
  color: tokens.colorNeutralForeground3,
  ':hover': {
    color: tokens.colorNeutralForeground3Hover,
  },
  ':focus': {
    color: tokens.colorNeutralForeground3Hover,
  },
});

const useIconBaseStyles = makeResetStyles({
  width: '20px',
  height: '20px',
  fontSize: '20px',
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});

const useSubmenuIndicatorBaseStyles = makeResetStyles({
  width: '20px',
  height: '20px',
  fontSize: '20px',
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});

const useStyles = makeStyles({
  checkmark: {
    marginTop: '2px',
  },

  splitItemMain: {
    flexGrow: 1,
  },

  splitItemTrigger: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 0,
    '::before': {
      content: '""',
      width: tokens.strokeWidthThin,
      height: '24px',
      backgroundColor: tokens.colorNeutralStroke1,
    },
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

    ':hover:active': {
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: tokens.colorNeutralBackground1,
    },

    ':focus': {
      color: tokens.colorNeutralForegroundDisabled,
    },

    '@media (forced-colors: active)': {
      color: 'GrayText',
      ':hover': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
        [`& .${menuItemClassNames.icon}`]: {
          color: 'GrayText',
          backgroundColor: 'Canvas',
        },
      },
      ':focus': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
      },
    },
  },
});

/** Applies style classnames to slots */
export const useMenuItemStyles_unstable = (state: MenuItemState): MenuItemState => {
  'use no memo';

  const styles = useStyles();
  const rootBaseStyles = useRootBaseStyles();
  const contentBaseStyles = useContentBaseStyles();
  const secondaryContentBaseStyles = useSecondaryContentBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const submenuIndicatorBaseStyles = useSubmenuIndicatorBaseStyles();
  state.root.className = mergeClasses(
    menuItemClassNames.root,
    rootBaseStyles,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(menuItemClassNames.content, contentBaseStyles, state.content.className);
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemClassNames.secondaryContent,
      !state.disabled && secondaryContentBaseStyles,
      state.secondaryContent.className,
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(menuItemClassNames.icon, iconBaseStyles, state.icon.className);
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      menuItemClassNames.submenuIndicator,
      submenuIndicatorBaseStyles,
      state.submenuIndicator.className,
    );
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
