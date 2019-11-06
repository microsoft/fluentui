import { getGlobalClassNames, HighContrastSelector } from '../../../Styling';
import { IMenuButtonComponent, IMenuButtonStylesReturnType, IMenuButtonTokenReturnType } from './MenuButton.types';

const baseTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  return {
    menuIconSize: 12,
    minWidth: 0
  };
};

const expandedTokens: IMenuButtonComponent['tokens'] = (props, theme): IMenuButtonTokenReturnType => {
  const { semanticColors } = theme;
  return {
    backgroundColorExpanded: semanticColors.buttonBackgroundPressed,
    backgroundColorExpandedHovered: semanticColors.buttonBackgroundPressed,
    backgroundColorExpandedPressed: semanticColors.buttonBackgroundPressed,

    borderColor: semanticColors.buttonBorder,
    borderColorHovered: semanticColors.buttonBorder,
    borderColorPressed: semanticColors.buttonBorder,

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
    backgroundColorExpanded: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorExpandedHovered: semanticColors.primaryButtonBackgroundPressed,
    backgroundColorExpandedPressed: semanticColors.primaryButtonBackgroundPressed,

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

const GlobalClassNames = {
  msMenuButton: 'ms-MenuButton'
};

export const MenuButtonStyles: IMenuButtonComponent['styles'] = (props, theme, tokens): IMenuButtonStylesReturnType => {
  const { className } = props;

  const globalClassNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: {
      display: 'inline-flex'
    },
    button: [
      globalClassNames.msMenuButton,
      {
        backgroundColor: props.expanded ? tokens.backgroundColorExpanded : tokens.backgroundColor,
        borderColor: tokens.borderColor,
        color: tokens.color,
        minWidth: tokens.minWidth,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: tokens.highContrastBackgroundColor,
            color: tokens.highContrastColor,
            borderColor: tokens.highContrastBorderColor
          },
          ':hover': {
            backgroundColor: props.expanded ? tokens.backgroundColorExpandedHovered : tokens.backgroundColorHovered,
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
            backgroundColor: props.expanded ? tokens.backgroundColorExpandedPressed : tokens.backgroundColorPressed,
            color: tokens.colorPressed,

            selectors: {
              [HighContrastSelector]: {
                backgroundColor: tokens.highContrastBackgroundColorPressed,
                color: tokens.highContrastColorPressed,
                borderColor: tokens.highContrastBorderColorPressed
              }
            }
          }
        }
      },
      className
    ],
    menuArea: {
      height: 'auto',
      width: 'auto'
    },
    menuIcon: {
      fontSize: tokens.menuIconSize,
      paddingTop: '5px'
    }
  };
};
