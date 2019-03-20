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

const disabledTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: theme.semanticColors.buttonBackgroundDisabled,
    backgroundColorHovered: semanticColors.buttonBackgroundDisabled,
    backgroundColorPressed: semanticColors.buttonBackgroundDisabled,

    iconColor: semanticColors.buttonTextDisabled,
    iconColorHovered: semanticColors.buttonTextDisabled,
    iconColorPressed: semanticColors.buttonTextDisabled,

    color: semanticColors.buttonTextDisabled,
    colorHovered: semanticColors.buttonTextDisabled,
    colorPressed: semanticColors.buttonTextDisabled,

    borderColor: semanticColors.buttonBorderDisabled,
    borderColorHovered: semanticColors.buttonBorderDisabled,
    borderColorPressed: semanticColors.buttonBorderDisabled
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

    iconColor: semanticColors.primaryButtonText,
    iconColorHovered: semanticColors.primaryButtonTextHovered,
    iconColorPressed: semanticColors.primaryButtonTextPressed,

    borderColor: semanticColors.primaryButtonBorder
  };
};

export const ButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  !props.disabled && enabledTokens,
  props.primary && primaryEnabledTokens,
  props.circular && circularTokens,
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
    }
  };
};
