import { IButtonStyles } from '@fluentui/react/lib/Button';
import { ITheme } from '@fluentui/react/lib/Styling';
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
      height: StyleConstants.commandBarHeight,
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      ...iconColor(extendedSemanticColors.iconButtonFill),
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
      ...iconColor(semanticColors.primaryButtonTextDisabled),
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
      selectors: {
        ':hover': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      color: semanticColors.buttonTextPressed,
      selectors: {
        ':active': {
          ...iconColor(extendedSemanticColors.iconButtonFillHovered),
        },
      },
    },
    rootFocused: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.inputBorderPressed}`,
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
