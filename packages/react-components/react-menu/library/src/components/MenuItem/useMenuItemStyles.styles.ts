import { mergeClasses, makeStyles, makeResetStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import { useCheckmarkStyles_unstable } from '../../selectable/index';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';
import type { MenuItemSlots, MenuItemState } from './MenuItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  borderRadius: semanticTokens.ctrlListCornerRest,
  borderWidth: semanticTokens.strokeWidthDefault,
  position: 'relative',
  color: semanticTokens.foregroundCtrlOnSubtleRest,
  backgroundColor: semanticTokens.backgroundCtrlSubtleRest,
  paddingRight: semanticTokens._ctrlMenuItemPaddingX,
  paddingLeft: semanticTokens._ctrlMenuItemPaddingX,
  paddingTop: semanticTokens._ctrlMenuItemPaddingTop,
  paddingBottom: semanticTokens._ctrlMenuItemPaddingBottom,
  boxSizing: 'border-box',
  maxWidth: '290px',
  minHeight: semanticTokens._ctrlMenuItemSizeDefault,
  flexShrink: 0,
  display: 'flex',
  alignItems: 'start',
  fontSize: semanticTokens.textRampItemBodyFontSize,
  cursor: 'pointer',
  gap: semanticTokens._ctrlMenuItemGapInsideDefault,

  ':hover': {
    backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
    color: semanticTokens.foregroundCtrlOnSubtleHover,
    borderRadius: semanticTokens.ctrlListCornerHover,

    [`& .${iconFilledClassName}`]: {
      display: 'inline',
    },
    [`& .${iconRegularClassName}`]: {
      display: 'none',
    },
    [`& .${menuItemClassNames.icon}`]: {
      color: semanticTokens.foregroundCtrlIconOnSubtleHover,
    },

    [`& .${menuItemClassNames.subText}`]: {
      color: semanticTokens._ctrlMenuItemSubTextForegroundHover,
    },
  },

  ':hover:active': {
    backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
    color: semanticTokens.foregroundCtrlOnSubtlePressed,

    [`& .${menuItemClassNames.subText}`]: {
      color: semanticTokens._ctrlMenuItemSubTextForegroundPressed,
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
  paddingLeft: semanticTokens._ctrlMenuItemContentPaddingX,
  paddingRight: semanticTokens._ctrlMenuItemContentPaddingX,
  backgroundColor: 'transparent',
  flexGrow: 1,
});

const useSecondaryContentBaseStyles = makeResetStyles({
  paddingLeft: semanticTokens._ctrlMenuItemContentPaddingX,
  paddingRight: semanticTokens._ctrlMenuItemContentPaddingX,
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens._ctrlMenuItemSecondaryContentFontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textGlobalBody3LineHeight,
  color: semanticTokens._ctrlMenuItemSecondaryContentForegroundRest,
  ':hover': {
    color: semanticTokens._ctrlMenuItemSecondaryContentForegroundHover,
  },
  ':focus': {
    color: semanticTokens._ctrlMenuItemSecondaryContentForegroundHover,
  },
});

const useIconBaseStyles = makeResetStyles({
  width: semanticTokens.sizeCtrlIcon,
  height: semanticTokens.sizeCtrlIcon,
  fontSize: semanticTokens.sizeCtrlIcon,
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
  flexShrink: 0,
});

const useSubmenuIndicatorBaseStyles = makeResetStyles({
  width: semanticTokens.sizeCtrlIconSecondary,
  height: semanticTokens.sizeCtrlIconSecondary,
  fontSize: semanticTokens.sizeCtrlIconSecondary,
  lineHeight: 0,
  alignItems: 'center',
  display: 'inline-flex',
  justifyContent: 'center',
});

const useSubtextBaseStyles = makeResetStyles({
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.textGlobalCaption2FontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textGlobalCaption2LineHeight,
  color: semanticTokens._ctrlMenuItemSecondaryContentForegroundRest,
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
      width: semanticTokens.strokeWidthDefault,
      height: '24px',
      backgroundColor: semanticTokens.strokeCtrlOnNeutralRest,
    },
  },
  disabled: {
    color: semanticTokens.foregroundCtrlOnSubtleDisabled,
    backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
    ':hover': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
      cursor: 'not-allowed',
      [`& .${iconFilledClassName}`]: {
        display: 'none',
      },
      [`& .${iconRegularClassName}`]: {
        display: 'inline',
      },
      [`& .${menuItemClassNames.icon}`]: {
        color: semanticTokens.foregroundCtrlIconOnSubtleDisabled,
      },
    },

    ':hover:active': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
      backgroundColor: semanticTokens.backgroundCtrlSubtleDisabled,
    },

    ':focus': {
      color: semanticTokens.foregroundCtrlOnSubtleDisabled,
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
      !state.disabled && secondaryContentBaseStyles,
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
    state.subText.className = mergeClasses(menuItemClassNames.subText, state.subText.className, subtextBaseStyles);
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
