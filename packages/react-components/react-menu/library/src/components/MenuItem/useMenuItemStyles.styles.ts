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
  subText: 'fui-MenuItem__subText',
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

    [`& .${menuItemClassNames.subText}`]: {
      color: tokens.colorNeutralForeground3Hover,
    },
  },

  ':hover:active': {
    backgroundColor: tokens.colorNeutralBackground1Pressed,
    color: tokens.colorNeutralForeground2Pressed,

    [`& .${menuItemClassNames.subText}`]: {
      color: tokens.colorNeutralForeground3Pressed,
    },
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
  flexShrink: 0,
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

const useSubtextBaseStyles = makeResetStyles({
  ...typographyStyles.caption2,
  color: tokens.colorNeutralForeground3,
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
      [`& .${menuItemClassNames.subText}`]: {
        color: tokens.colorNeutralForegroundDisabled,
      },
    },

    ':hover:active': {
      color: tokens.colorNeutralForegroundDisabled,
      backgroundColor: tokens.colorNeutralBackground1,

      [`& .${menuItemClassNames.subText}`]: {
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
        backgroundColor: 'Canvas',
        [`& .${menuItemClassNames.icon}`]: {
          color: 'GrayText',
          backgroundColor: 'Canvas',
        },
        [`& .${menuItemClassNames.subText}`]: {
          color: 'GrayText',
        },
      },
      ':hover:active': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
        [`& .${menuItemClassNames.subText}`]: {
          color: 'GrayText',
        },
      },
      ':focus': {
        color: 'GrayText',
        backgroundColor: 'Canvas',
      },
    },
  },
});

const useSubTextStyles = makeStyles({
  disabled: {
    color: tokens.colorNeutralForegroundDisabled,

    '@media (forced-colors: active)': {
      color: 'GrayText',
    },
  },
});

const useMultilineStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
  },

  secondaryContent: {
    alignSelf: 'center',
  },

  submenuIndicator: {
    alignSelf: 'center',
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
  const multilineStyles = useMultilineStyles();
  const subtextBaseStyles = useSubtextBaseStyles();
  const subTextStyles = useSubTextStyles();
  const multiline = !!state.subText;
  state.root.className = mergeClasses(
    menuItemClassNames.root,
    rootBaseStyles,
    state.disabled && styles.disabled,
    state.root.className,
  );

  if (state.content) {
    state.content.className = mergeClasses(
      menuItemClassNames.content,
      contentBaseStyles,
      state.content.className,
      multiline && multilineStyles.content,
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(menuItemClassNames.checkmark, styles.checkmark, state.checkmark.className);
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      menuItemClassNames.secondaryContent,
      secondaryContentBaseStyles,
      state.disabled && styles.disabled,
      state.secondaryContent.className,
      multiline && multilineStyles.secondaryContent,
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
      multiline && multilineStyles.submenuIndicator,
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      menuItemClassNames.subText,
      state.disabled && subTextStyles.disabled,
      state.subText.className,
      subtextBaseStyles,
    );
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
