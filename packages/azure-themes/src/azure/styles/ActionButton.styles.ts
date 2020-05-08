import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const ActionButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
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
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      ...iconColor(semanticColors.primaryButtonBackground),
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextDisabled}`,
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      ...iconColor(semanticColors.primaryButtonBackgroundDisabled),
    },
    rootHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.primaryButtonBackgroundHovered),
        },
      },
    },
    rootPressed: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.inputBorderPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.primaryButtonBackgroundPressed),
        },
      },
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      ...iconColor(semanticColors.primaryButtonBackgroundPressed),
    },
    rootCheckedHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(semanticColors.primaryButtonBackgroundPressed),
        },
      },
    },
    rootCheckedPressed: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(semanticColors.primaryButtonBackgroundPressed),
        },
      },
    },
  };
};
