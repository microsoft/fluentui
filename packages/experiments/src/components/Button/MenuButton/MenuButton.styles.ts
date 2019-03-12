import { IMenuButtonComponent, IMenuButtonStylesReturnType, IMenuButtonTokenReturnType } from './MenuButton.types';

const baseTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  return {
    contentPadding: '8px 10px',
    minWidth: 0
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
  baseTokens,
  props.expanded && expandedTokens,
  props.primary && props.expanded && primaryExpandedTokens
];

export const MenuButtonStyles: IMenuButtonComponent['styles'] = (props, theme, tokens): IMenuButtonStylesReturnType => {
  const { className } = props;

  return {
    button: [
      {
        backgroundColor: tokens.backgroundColor,
        color: tokens.color,
        minWidth: tokens.minWidth,

        selectors: {
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered
          },
          ':hover:active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed
          },
          '> *': {
            padding: tokens.contentPadding
          }
        }
      },
      className
    ],
    menuIcon: {
      paddingTop: '3px'
    }
  };
};
