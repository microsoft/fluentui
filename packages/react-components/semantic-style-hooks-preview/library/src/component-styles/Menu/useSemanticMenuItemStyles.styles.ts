import { mergeClasses, makeStyles, makeResetStyles } from '@griffel/react';
import { iconFilledClassName, iconRegularClassName } from '@fluentui/react-icons';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';
import {
  useCheckmarkStyles_unstable,
  type MenuItemState,
  type MenuItemCheckboxState,
  menuItemClassNames,
} from '@fluentui/react-menu';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticMenuItemStyles = (_state: unknown): MenuItemState => {
  'use no memo';

  const state = _state as MenuItemState;
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
    state.root.className,
    menuItemClassNames.root,
    rootBaseStyles,
    state.disabled && styles.disabled,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.content) {
    state.content.className = mergeClasses(
      state.content.className,
      menuItemClassNames.content,
      contentBaseStyles,
      multiline && multilineStyles.content,
      getSlotClassNameProp_unstable(state.content),
    );
  }

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      menuItemClassNames.checkmark,
      styles.checkmark,
      getSlotClassNameProp_unstable(state.checkmark),
    );
  }

  if (state.secondaryContent) {
    state.secondaryContent.className = mergeClasses(
      state.secondaryContent.className,
      menuItemClassNames.secondaryContent,
      !state.disabled && secondaryContentBaseStyles,
      multiline && multilineStyles.secondaryContent,
      getSlotClassNameProp_unstable(state.secondaryContent),
    );
  }

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      menuItemClassNames.icon,
      iconBaseStyles,
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.submenuIndicator) {
    state.submenuIndicator.className = mergeClasses(
      state.submenuIndicator.className,
      menuItemClassNames.submenuIndicator,
      submenuIndicatorBaseStyles,
      multiline && multilineStyles.submenuIndicator,
      getSlotClassNameProp_unstable(state.submenuIndicator),
    );
  }

  if (state.subText) {
    state.subText.className = mergeClasses(
      state.subText.className,
      menuItemClassNames.subText,
      subtextBaseStyles,
      getSlotClassNameProp_unstable(state.subText),
    );
  }

  useCheckmarkStyles_unstable(state as MenuItemCheckboxState);

  return state;
};
