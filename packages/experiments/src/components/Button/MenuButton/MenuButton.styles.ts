import { getFocusStyle, getGlobalClassNames } from '../../../Styling';
import { IsFocusVisibleClassName } from '../../../Utilities';
import { IMenuButtonComponent, IMenuButtonStylesReturnType, IMenuButtonTokenReturnType } from './MenuButton.types';

const menuTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  return {
    contentPadding: '8px 0px'
  };
};

const expandedTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
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

const primaryExpandedTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
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

export const MenuButtonTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => [
  menuTokens,
  props.expanded && expandedTokens,
  props.primary && props.expanded && primaryExpandedTokens
];

export const MenuButtonStyles: IMenuButtonComponent['styles'] = (props, theme, tokens): IMenuButtonStylesReturnType => {
  const { className } = props;

  const globalClassNames = getGlobalClassNames(
    {
      icon: 'ms-Icon'
    },
    theme,
    true
  );

  return {
    button: [
      getFocusStyle(theme),
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
    }
  };
};
