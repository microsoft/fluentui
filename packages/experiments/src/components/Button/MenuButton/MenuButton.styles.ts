import { IMenuButtonComponent, IMenuButtonStylesReturnType, IMenuButtonTokenReturnType } from './MenuButton.types';
import { HighContrastSelector } from '../../../Styling';

const baseTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  return {
    contentPadding: '0px 10px',
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
    colorPressed: semanticColors.buttonTextPressed,

    highContrastColor: 'Highlight',
    highContrastColorHovered: 'Highlight',
    highContrastColorPressed: 'Highlight',

    highContrastBorderColor: 'Highlight',
    highContrastBorderColorHovered: 'Highlight',
    highContrastBorderColorPressed: 'Highlight'
  };
};

const primaryExpandedTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColor: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorHovered: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorPressed: semanticColors.primaryButtonBackgroundPressed,

    highContrastBackgroundColor: 'Highlight',
    highContrastBackgroundColorHovered: 'Highlight',
    highContrastBackgroundColorPressed: 'Highlight',

    color: semanticColors.primaryButtonTextPressed,
    colorHovered: semanticColors.primaryButtonTextPressed,
    colorPressed: semanticColors.primaryButtonTextPressed,

    highContrastColor: 'Window',
    highContrastColorHovered: 'Window',
    highContrastColorPressed: 'Window'
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
          [HighContrastSelector]: {
            backgroundColor: tokens.highContrastBackgroundColor,
            color: tokens.highContrastColor,
            borderColor: tokens.highContrastBorderColor
          },
          ':hover': {
            backgroundColor: tokens.backgroundColorHovered,
            color: tokens.colorHovered,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorHovered,
                color: tokens.highContrastColorHovered,
                borderColor: tokens.highContrastBorderColorHovered
              }
            }
          },
          ':hover:active': {
            backgroundColor: tokens.backgroundColorPressed,
            color: tokens.colorPressed,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorPressed,
                color: tokens.highContrastColorPressed,
                borderColor: tokens.highContrastBorderColorPressed
              }
            }
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
