import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';
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
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.buttonBackground,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonText,
      ...iconColor(extendedSemanticColors.iconButtonFill),
    },
    rootDisabled: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
      ...iconColor(semanticColors.primaryButtonTextDisabled),
    },
    rootHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
    rootPressed: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.inputBorderPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      ...iconColor(extendedSemanticColors.iconButtonFillHovered),
    },
    rootCheckedHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
    rootCheckedPressed: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
  };
};
