import { parseGap } from 'office-ui-fabric-react/lib/components/Stack/StackUtils';
import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { getFocusStyle, getGlobalClassNames, FontWeights, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

export const baseTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { effects } = theme;

  return {
    borderRadius: effects.roundedCorner2,
    borderStyle: 'solid',
    borderStyleFocused: 'solid',
    borderWidth: 1,
    childrenGap: 8,
    contentPadding: '0px 20px',
    cursor: 'pointer',
    iconSize: 16,
    iconWeight: 400,
    lineHeight: 1,
    minHeight: 32,
    minWidth: 100,
    textFamily: 'inherit',
    textSize: 14,
    textWeight: FontWeights.semibold
  };
};

export const hrefTokens: IButtonComponent['tokens'] = {
  contentPadding: '8px 16px'
};

export const circularTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;

  return {
    backgroundClipFocused: 'content-box',
    borderColorFocused: semanticColors.focusBorder,
    borderRadius: '50%',
    borderStyleFocused: 'double',
    borderWidthFocused: 3,
    contentPadding: 0,
    contentPaddingFocused: 1,
    minHeight: 32,
    minWidth: 32,
    outlineColor: 'transparent'
  };
};

export const enabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackground,
    backgroundColorHovered: semanticColors.buttonBackgroundHovered,
    backgroundColorPressed: semanticColors.buttonBackgroundPressed,

    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,
    highContrastBorderColorHovered: 'Highlight',
    highContrastBorderColorPressed: 'Highlight',

    color: semanticColors.buttonText,
    colorHovered: semanticColors.buttonTextHovered,
    colorPressed: semanticColors.buttonTextPressed,
    highContrastColorHovered: 'Highlight',
    highContrastColorPressed: 'Highlight',

    iconColor: semanticColors.buttonText,
    iconColorHovered: semanticColors.buttonTextHovered,
    iconColorPressed: semanticColors.buttonTextPressed,
    highContrastIconColorHovered: 'Highlight',
    highContrastIconColorPressed: 'Highlight'
  };
};

export const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,
    highContrastBackgroundColor: 'Window',
    highContrastBackgroundColorHovered: 'Window',
    highContrastBackgroundColorPressed: 'Window',

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled,
    highContrastBorderColor: 'GrayText',
    highContrastBorderColorHovered: 'GrayText',
    highContrastBorderColorPressed: 'GrayText',

    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,
    highContrastColor: 'GrayText',
    highContrastColorHovered: 'GrayText',
    highContrastColorPressed: 'GrayText',

    cursor: 'default',

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,
    highContrastIconColor: 'GrayText',
    highContrastIconColorHovered: 'GrayText',
    highContrastIconColorPressed: 'GrayText'
  };
};

export const primaryEnabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackground,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundHovered,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,
    highContrastBackgroundColor: 'WindowText',
    highContrastBackgroundColorHovered: 'Highlight',
    highContrastBackgroundColorPressed: 'Highlight',

    borderWidth: 0,

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

    msHighContrastAdjust: 'none',

    outlineColor: 'transparent'
  };
};

export const primaryCircularTokens: IButtonComponent['tokens'] = {
  borderStyleFocused: 'solid',
  borderWidthFocused: 1
};

export const checkedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
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

export const primaryCheckedTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
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

  const { rowGap, columnGap } = parseGap(tokens.childrenGap, theme);

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
        alignItems: 'center',
        backgroundColor: tokens.backgroundColor,
        borderColor: tokens.borderColor,
        borderRadius: tokens.borderRadius,
        borderStyle: tokens.borderStyle,
        borderWidth: tokens.borderWidth,
        boxSizing: 'border-box',
        color: tokens.color,
        cursor: tokens.cursor,
        display: 'inline-flex',
        flexDirection: 'row',
        fontSize: tokens.textSize,
        fontWeight: tokens.textWeight,
        height: tokens.height,
        justifyContent: 'center',
        margin: 0,
        minWidth: tokens.minWidth,
        minHeight: tokens.minHeight,
        outlineColor: tokens.outlineColor,
        overflow: 'hidden',
        padding: tokens.contentPadding,
        textAlign: 'center',
        textDecoration: 'none',
        userSelect: 'none',
        verticalAlign: 'baseline',
        width: tokens.width,

        selectors: {
          '> *': {
            marginLeft: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,
            textOverflow: 'ellipsis'
          },
          '> *:not(:first-child)': {
            marginLeft: `${columnGap.value}${columnGap.unit}`
          },
          [HighContrastSelector]: {
            backgroundColor: tokens.highContrastBackgroundColor,
            borderColor: tokens.highContrastBorderColor,
            borderWidth: 1,
            color: tokens.highContrastColor,
            MsHighContrastAdjust: tokens.msHighContrastAdjust
          },
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            borderColor: tokens.borderColorHovered,
            color: tokens.colorHovered,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorHovered,
                borderColor: tokens.highContrastBorderColorHovered,
                color: tokens.highContrastColorHovered
              }
            }
          },
          ':active': {
            backgroundColor: tokens.backgroundColorPressed,
            borderColor: tokens.borderColorPressed,
            color: tokens.colorPressed,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorPressed,
                borderColor: tokens.highContrastBorderColorPressed,
                color: tokens.highContrastColorPressed
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
            backgroundClip: tokens.backgroundClipFocused,
            borderColor: tokens.borderColorFocused,
            borderStyle: tokens.borderStyleFocused,
            borderWidth: tokens.borderWidthFocused,
            outlineColor: tokens.outlineColor,
            padding: tokens.contentPaddingFocused
          }
        }
      },
      className
    ],
    icon: [
      globalClassNames.msButtonIcon,
      {
        color: tokens.iconColor,
        display: 'flex',
        fill: tokens.iconColor,
        fontSize: tokens.iconSize,
        fontWeight: tokens.iconWeight,

        selectors: {
          [HighContrastSelector]: {
            color: tokens.highContrastIconColor
          }
        }
      }
    ],
    content: {
      fontFamily: tokens.textFamily,
      fontSize: tokens.textSize,
      fontWeight: tokens.textWeight,
      overflow: 'visible'
    }
  };
};
