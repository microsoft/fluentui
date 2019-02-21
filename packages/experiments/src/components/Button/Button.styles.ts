import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { getFocusStyle, getGlobalClassNames } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const baseTokens: IButtonComponent['tokens'] = {
  borderRadius: 0,
  borderWidth: 0,
  minWidth: 100,
  minHeight: 32,
  lineHeight: 1,
  contentPadding: '8px 16px',
  textFamily: 'default',
  textSize: 14,
  iconSize: 14,
  iconWeight: 400
};

const circularTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  return {
    borderRadius: '50%',
    borderWidth: 1,
    minWidth: 32,
    minHeight: 32,
    contentPadding: '',
    borderColorFocused: theme.palette.neutralSecondary,
    outlineColor: 'transparent',
    contentPaddingFocused: 1,
    backgroundClip: 'content-box'
  };
};

const enabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorHovered: semanticColors.buttonBackgroundHovered,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    iconColor: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    iconColorPressed: semanticColors.buttonTextPressed,

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,

    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder
  };
};

const primaryActionDisabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    primaryActionBackgroundColor: theme.semanticColors.buttonBackgroundDisabled,
    primaryActionBackgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    primaryActionBackgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    primaryActionColor: semanticColors.buttonTextDisabled,
    primaryActionColorHovered: semanticColors.buttonTextDisabled,
    primaryActionColorPressed: semanticColors.buttonTextDisabled,

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: theme.semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    primaryActionBackgroundColor: semanticColors.buttonBackgroundDisabled,
    primaryActionBackgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    primaryActionBackgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    secondaryActionBackgroundColor: semanticColors.buttonBackgroundDisabled,
    secondaryActionBackgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    secondaryActionBackgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,

    primaryActionColor: semanticColors.buttonTextDisabled,
    primaryActionColorHovered: semanticColors.buttonTextDisabled,
    primaryActionColorPressed: semanticColors.buttonTextDisabled,

    secondaryActionColor: semanticColors.buttonTextDisabled,
    secondaryActionColorHovered: semanticColors.buttonTextDisabled,
    secondaryActionColorPressed: semanticColors.buttonTextDisabled,

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled
  };
};

const expandedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundPressed,
    backgroundColorHovered: semanticColors.buttonBackgroundPressed,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    color: semanticColors.buttonTextPressed,
    colorHovered: semanticColors.buttonTextPressed,
    colorPressed: semanticColors.buttonTextPressed
  };
};

const menuTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  return {
    contentPadding: '8px 10px'
  };
};

const splitEnabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    contentPadding: 0,

    backgroundColor: semanticColors.buttonBackground,
    backgroundColorHovered: semanticColors.buttonBackground,
    backgroundColorPressed: semanticColors.buttonBackground,

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonText,
    colorPressed: semanticColors.buttonText,

    primaryActionBackgroundColor: semanticColors.buttonBackground,
    primaryActionBackgroundColorHovered: semanticColors.buttonBackgroundHovered,
    primaryActionBackgroundColorPressed: semanticColors.buttonBackgroundPressed,

    secondaryActionBackgroundColor: semanticColors.buttonBackground,
    secondaryActionBackgroundColorHovered: semanticColors.buttonBackgroundHovered,
    secondaryActionBackgroundColorPressed: semanticColors.buttonBackgroundPressed,

    primaryActionColor: semanticColors.buttonText,
    primaryActionColorHovered: semanticColors.buttonTextHovered,
    primaryActionColorPressed: semanticColors.buttonTextPressed,

    secondaryActionColor: semanticColors.buttonText,
    secondaryActionColorHovered: semanticColors.buttonTextHovered,
    secondaryActionColorPressed: semanticColors.buttonTextPressed
  };
};

const splitExpandedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    primaryActionBackgroundColor: semanticColors.buttonBackground,
    primaryActionBackgroundColorHovered: semanticColors.buttonBackground,
    primaryActionBackgroundColorPressed: semanticColors.buttonBackground,

    secondaryActionBackgroundColor: semanticColors.buttonBackgroundPressed,
    secondaryActionBackgroundColorHovered: semanticColors.buttonBackgroundPressed,
    secondaryActionBackgroundColorPressed: semanticColors.buttonBackgroundPressed,

    primaryActionColor: semanticColors.buttonText,
    primaryActionColorHovered: semanticColors.buttonText,
    primaryActionColorPressed: semanticColors.buttonText,

    secondaryActionColor: semanticColors.buttonTextPressed,
    secondaryActionColorHovered: semanticColors.buttonTextPressed,
    secondaryActionColorPressed: semanticColors.buttonTextPressed
  };
};

const primaryEnabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,

    primaryActionBackgroundColor: semanticColors.primaryButtonBackground,
    primaryActionBackgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    primaryActionBackgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    secondaryActionBackgroundColor: semanticColors.primaryButtonBackground,
    secondaryActionBackgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    secondaryActionBackgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    primaryActionColor: semanticColors.primaryButtonText,
    primaryActionColorHovered: semanticColors.primaryButtonTextHovered,
    primaryActionColorPressed: semanticColors.primaryButtonTextPressed,

    secondaryActionColor: semanticColors.primaryButtonText,
    secondaryActionColorHovered: semanticColors.primaryButtonTextHovered,
    secondaryActionColorPressed: semanticColors.primaryButtonTextPressed,

    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,

    borderColor: semanticColors.primaryButtonBorder
  };
};

const primaryExpandedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonTextPressed,
    colorHovered: semanticColors.primaryButtonTextPressed,
    colorPressed: semanticColors.primaryButtonTextPressed
  };
};

const splitPrimaryExpandedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackground,
    backgroundColorPressed: semanticColors.primaryButtonBackground,

    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonText,
    colorPressed: semanticColors.primaryButtonText,

    primaryActionBackgroundColor: semanticColors.primaryButtonBackground,
    primaryActionBackgroundColorHovered: semanticColors.primaryButtonBackground,
    primaryActionBackgroundColorPressed: semanticColors.primaryButtonBackground,

    secondaryActionBackgroundColor: semanticColors.primaryButtonBackgroundPressed,
    secondaryActionBackgroundColorHovered: semanticColors.primaryButtonBackgroundPressed,
    secondaryActionBackgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    primaryActionColor: semanticColors.primaryButtonText,
    primaryActionColorHovered: semanticColors.primaryButtonText,
    primaryActionColorPressed: semanticColors.primaryButtonText,

    secondaryActionColor: semanticColors.primaryButtonTextPressed,
    secondaryActionColorHovered: semanticColors.primaryButtonTextPressed,
    secondaryActionColorPressed: semanticColors.primaryButtonTextPressed
  };
};

export const ButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !props.disabled && enabledTokens,
  props.expanded && expandedTokens,
  props.menu && menuTokens,
  props.split && splitEnabledTokens,
  props.split && props.expanded && splitExpandedTokens,
  props.primary && primaryEnabledTokens,
  props.primary && props.expanded && primaryExpandedTokens,
  props.split && props.primary && props.expanded && splitPrimaryExpandedTokens,
  props.circular && circularTokens,
  props.split && props.primaryActionDisabled && primaryActionDisabledTokens,
  props.disabled && disabledTokens
];

export const ButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { className, circular } = props;

  const globalClassNames = getGlobalClassNames(
    {
      icon: 'ms-Icon'
    },
    theme,
    true
  );

  return {
    root: [
      !circular && getFocusStyle(theme),
      theme.fonts.medium,
      {
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: 'solid',
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: 'default',
        display: 'inline-block',
        fontSize: tokens.textSize,
        fontWeight: tokens.textWeight,
        height: tokens.height,
        justifyContent: 'center',
        margin: 0,
        minWidth: tokens.minWidth,
        minHeight: tokens.minHeight,
        overflow: 'hidden',
        padding: 0,
        textDecoration: 'none',
        textAlign: 'center',
        userSelect: 'none',
        verticalAlign: 'baseline',
        width: tokens.width,
        outlineColor: tokens.outlineColor,

        selectors: {
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,
            borderColor: tokens.borderColorHovered
          },
          ':hover:active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,
            borderColor: tokens.borderColorPressed
          },
          [`:hover .${globalClassNames.icon}`]: {
            color: tokens.iconColorHovered
          },
          [`:hover:active .${globalClassNames.icon}`]: {
            color: tokens.iconColorPressed
          },
          // We have this here to establish the focus style of circular Buttons. If we use getFocusStyle to get the focus style, then the
          // focus style for circular Buttons becomes busted, and the way to fix it is via the backgroundClip and padding attributes, which
          // we don't have access to via getFocusStyle.
          [`.${IsFocusVisibleClassName} &:focus`]: {
            borderColor: tokens.borderColorFocused,
            outlineColor: tokens.outlineColor,
            backgroundClip: tokens.backgroundClip,
            padding: tokens.contentPaddingFocused
          }
        }
      },
      className
    ],
    stack: {
      padding: tokens.contentPadding,
      height: '100%'
    },
    icon: [
      {
        display: 'flex',
        fontSize: tokens.iconSize,
        color: tokens.iconColor,
        fill: tokens.iconColor,
        // tslint:disable-next-line:no-any
        fontWeight: tokens.iconWeight as any
      },
      globalClassNames.icon
    ],
    content: {
      overflow: 'visible'
    },
    menuIcon: {
      paddingTop: '3px'
    },

    // Split button slots styling
    primaryActionContainer: {
      backgroundColor: tokens.primaryActionBackgroundColor,
      color: tokens.primaryActionColor,
      minHeight: tokens.minHeight,
      marginRight: '-8px',
      paddingLeft: '10px',
      paddingRight: '8px',
      selectors: {
        ':hover': {
          backgroundColor: tokens.primaryActionBackgroundColorHovered,
          color: tokens.primaryActionColorHovered,
          borderColor: tokens.borderColorHovered
        },
        ':hover:active': {
          backgroundColor: tokens.primaryActionBackgroundColorPressed,
          color: tokens.primaryActionColorPressed,
          borderColor: tokens.borderColorPressed
        },
        [`:hover .${globalClassNames.icon}`]: {
          color: tokens.iconColorHovered
        },
        [`:hover:active .${globalClassNames.icon}`]: {
          color: tokens.iconColorPressed
        }
      }
    },
    secondaryActionContainer: {
      backgroundColor: tokens.secondaryActionBackgroundColor,
      color: tokens.secondaryActionColor,
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '8px',
      paddingRight: '10px',
      selectors: {
        ':hover': {
          backgroundColor: tokens.secondaryActionBackgroundColorHovered,
          color: tokens.secondaryActionColorHovered,
          borderColor: tokens.borderColorHovered
        },
        ':hover:active': {
          backgroundColor: tokens.secondaryActionBackgroundColorPressed,
          color: tokens.secondaryActionColorPressed,
          borderColor: tokens.borderColorPressed
        },
        [`:hover .${globalClassNames.icon}`]: {
          color: tokens.iconColorHovered
        },
        [`:hover:active .${globalClassNames.icon}`]: {
          color: tokens.iconColorPressed
        }
      }
    },
    splitDivider: {
      borderRight: '1px solid #c8c8c8',
      boxSizing: 'border-box',
      height: '100%',
      margin: '8px -8px 8px 0px',
      padding: '8px 0px',
      width: 1
    }
  };
};
