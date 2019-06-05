import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { getFocusStyle, getGlobalClassNames, FontWeights, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { effects } = theme;

  return {
    borderRadius: effects.roundedCorner2,
    borderStyle: 'solid',
    borderStyleFocused: 'solid',
    borderWidth: 1,
    cursor: 'pointer',
    minWidth: 100,
    minHeight: 32,
    lineHeight: 1,
    contentPadding: '0px 20px',
    textFamily: 'inherit',
    textSize: 14,
    textWeight: FontWeights.semibold,
    iconSize: 16,
    iconWeight: 400
  };
};

const hrefTokens: IButtonComponent['tokens'] = {
  contentPadding: '8px 16px'
};

const circularTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    borderRadius: '50%',
    borderStyleFocused: 'double',
    borderWidthFocused: 3,
    minWidth: 32,
    minHeight: 32,
    contentPadding: '',
    borderColorFocused: semanticColors.focusBorder,
    outlineColor: 'transparent',
    contentPaddingFocused: 1,
    backgroundClip: 'content-box'
  };
};

const enabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { palette, semanticColors } = theme;
  return {
    backgroundColor: palette.white,
    backgroundColorHovered: palette.neutralLighter,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    iconColor: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    iconColorPressed: semanticColors.buttonTextPressed,

    highContrastIconColorHovered: 'Highlight',
    highContrastIconColorPressed: 'Highlight',

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,

    highContrastColorHovered: 'Highlight',
    highContrastColorPressed: 'Highlight',

    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,

    highContrastBorderColorHovered: 'Highlight',
    highContrastBorderColorPressed: 'Highlight'
  };
};

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    highContrastBackgroundColor: 'Window',
    highContrastBackgroundColorHovered: 'Window',
    highContrastBackgroundColorPressed: 'Window',

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    highContrastIconColor: 'GrayText',
    highContrastIconColorHovered: 'GrayText',
    highContrastIconColorPressed: 'GrayText',

    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,

    highContrastColor: 'GrayText',
    highContrastColorHovered: 'GrayText',
    highContrastColorPressed: 'GrayText',

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,

    highContrastBorderColor: 'GrayText',
    highContrastBorderColorHovered: 'GrayText',
    highContrastBorderColorPressed: 'GrayText',

    cursor: 'default'
  };
};

const primaryEnabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    highContrastBackgroundColor: 'WindowText',
    highContrastBackgroundColorHovered: 'Highlight',
    highContrastBackgroundColorPressed: 'Highlight',

    color: semanticColors.primaryButtonText,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,

    highContrastColor: 'Window',
    highContrastColorHovered: 'Window',
    highContrastColorPressed: 'Window',

    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,

    highContrastIconColor: 'Window',
    highContrastIconColorHovered: 'Window',
    highContrastIconColorPressed: 'Window',

    borderWidth: 0,

    outlineColor: 'transparent',

    msHighContrastAdjust: 'none'
  };
};

const primaryCircularTokens: IButtonComponent['tokens'] = {
  borderStyleFocused: 'solid',
  borderWidthFocused: 1
};

const checkedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundChecked,
    backgroundColorHovered: semanticColors.buttonBackgroundCheckedHovered,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    color: semanticColors.buttonTextChecked,
    colorHovered: semanticColors.buttonTextCheckedHovered,
    colorPressed: semanticColors.buttonTextPressed,

    iconColor: semanticColors.buttonTextChecked,
    iconColorHovered: semanticColors.buttonTextCheckedHovered,
    iconColorPressed: semanticColors.buttonTextPressed
  };
};

const primaryCheckedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    color: semanticColors.primaryButtonTextPressed,
    colorHovered: semanticColors.primaryButtonTextHovered,
    colorPressed: semanticColors.primaryButtonTextPressed,

    iconColor: semanticColors.primaryButtonTextPressed,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed
  };
};

export const ButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !!props.href && hrefTokens,
  !props.disabled && enabledTokens,
  props.primary && primaryEnabledTokens,
  props.circular && circularTokens,
  props.circular && props.primary && primaryCircularTokens,
  props.checked && checkedTokens,
  props.checked && props.primary && primaryCheckedTokens,
  props.disabled && disabledTokens
];

const GlobalClassNames = {
  msButton: 'ms-Button',
  msButtonIcon: 'ms-Button-icon'
};

export const ButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { className, circular } = props;

  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      globalClassNames.msButton,
      !circular && getFocusStyle(theme, { inset: 1, outlineColor: tokens.outlineColor }),
      circular && {
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus`]: {
            borderWidth: 1
          }
        }
      },
      theme.fonts.medium,
      {
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: tokens.borderStyle,
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: tokens.cursor,
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
          [HighContrastSelector]: {
            backgroundColor: tokens.highContrastBackgroundColor,
            borderColor: tokens.highContrastBorderColor,
            borderWidth: 1,
            color: tokens.highContrastColor,
            MsHighContrastAdjust: tokens.msHighContrastAdjust
          },
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,
            borderColor: tokens.borderColorHovered,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorHovered,
                color: tokens.highContrastColorHovered,
                borderColor: tokens.highContrastBorderColorHovered
              }
            }
          },
          ':active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,
            borderColor: tokens.borderColorPressed,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorPressed,
                color: tokens.highContrastColorPressed,
                borderColor: tokens.highContrastBorderColorPressed
              }
            }
          },
          [`:hover .${globalClassNames.msButtonIcon}`]: {
            color: tokens.iconColorHovered,

            selectors: {
              [HighContrastSelector]: {
                color: tokens.highContrastIconColorHovered
              }
            }
          },
          [`:active .${globalClassNames.msButtonIcon}`]: {
            color: tokens.iconColorPressed,

            selectors: {
              [HighContrastSelector]: {
                color: tokens.highContrastIconColorPressed
              }
            }
          },
          // We have this here to establish the focus style of circular Buttons. If we use getFocusStyle to get the focus style, then the
          // focus style for circular Buttons becomes busted, and the way to fix it is via the backgroundClip and padding attributes, which
          // we don't have access to via getFocusStyle.
          [`.${IsFocusVisibleClassName} &:focus`]: {
            borderColor: tokens.borderColorFocused,
            borderStyle: tokens.borderStyleFocused,
            borderWidth: tokens.borderWidthFocused,
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
      globalClassNames.msButtonIcon,
      {
        display: 'flex',
        fontSize: tokens.iconSize,
        color: tokens.iconColor,
        fill: tokens.iconColor,
        // tslint:disable-next-line:no-any
        fontWeight: tokens.iconWeight as any,

        selectors: {
          [HighContrastSelector]: {
            color: tokens.highContrastIconColor
          }
        }
      }
    ],
    content: {
      overflow: 'visible',
      fontFamily: tokens.textFamily,
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight
    }
  };
};
