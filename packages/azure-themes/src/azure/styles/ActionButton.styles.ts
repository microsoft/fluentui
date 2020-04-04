import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';

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
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderColor}`,
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      ...iconColor(extendedSemanticColors.iconButtonColor),
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
      backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderHovered}`,
      selectors: {
        ':hover': {
          ...iconColor(extendedSemanticColors.iconHoveredColor),
        },
      },
    },
    rootPressed: {
      borderColor: extendedSemanticColors.buttonBorderColor,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      selectors: {
        ':active': {
          ...iconColor(extendedSemanticColors.iconPressedColor),
        },
      },
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderColor}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      ...iconColor(extendedSemanticColors.iconPressedColor),
    },
    rootCheckedHovered: {
      color: semanticColors.buttonText,
      fill: semanticColors.buttonText,
      backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderHovered}`,
      selectors: {
        ':hover': {
          ...iconColor(extendedSemanticColors.iconHoveredColor),
        },
      },
    },
    rootCheckedPressed: {
      borderColor: extendedSemanticColors.buttonBorderColor,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonText,
      selectors: {
        ':active': {
          ...iconColor(extendedSemanticColors.iconPressedColor),
        },
      },
    },
  };
};
