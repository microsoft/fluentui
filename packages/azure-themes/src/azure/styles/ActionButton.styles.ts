import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';

export const ActionButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const iconColor = (color: string) => {
    return {
      selectors: {
        '.ms-Button-icon': { color },
      },
    };
  };
  return {
    root: {
      fontSize: FontSizes.size13,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonBorderColor}`,
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      ...iconColor(semanticColors.iconButtonColor),
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextDisabled}`,
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      ...iconColor(semanticColors.buttonTextDisabled),
    },
    rootHovered: {
      color: semanticColors.buttonText,
      fill: semanticColors.buttonText,
      backgroundColor: semanticColors.buttonBackgroundHoveredDefault,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonBorderHovered}`,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.iconHoveredColor),
        },
      },
    },
    rootPressed: {
      borderColor: semanticColors.buttonBorderColor,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.iconPressedColor),
        },
      },
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonBorderColor}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      ...iconColor(semanticColors.iconPressedColor),
    },
    rootCheckedHovered: {
      color: semanticColors.buttonText,
      fill: semanticColors.buttonText,
      backgroundColor: semanticColors.buttonBackgroundHoveredDefault,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonBorderHovered}`,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.iconHoveredColor),
        },
      },
    },
    rootCheckedPressed: {
      borderColor: semanticColors.buttonBorderColor,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.iconPressedColor),
        },
      },
    },
  };
};
