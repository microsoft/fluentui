import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';

export const ActionButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const iconColor = (color: string) => {
    return {
      selectors: {
        '.ms-Button-icon': { color }
      }
    };
  };
  return {
    root: {
      fontSize: FontSizes.size12,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonText}`,
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      ...iconColor(semanticColors.buttonText)
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextDisabled}`,
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      ...iconColor(semanticColors.buttonTextDisabled)
    },
    rootHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.buttonTextHovered)
        }
      }
    },
    rootPressed: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.buttonTextPressed)
        }
      }
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      ...iconColor(semanticColors.buttonTextPressed)
    },
    rootCheckedHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.buttonTextHovered)
        }
      }
    },
    rootCheckedPressed: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.buttonTextPressed)
        }
      }
    }
  };
};
