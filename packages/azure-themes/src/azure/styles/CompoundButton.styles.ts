import { IButtonStyles } from '@fluentui/react/lib/Button';
import { ITheme } from '@fluentui/react/lib/Styling';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const CompoundButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  const labelTextColor = (color: string) => {
    return {
      '.ms-Button-description': { color },
      '.ms-Button-label': { color },
    };
  };

  return {
    root: {
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.buttonBackground,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      selectors: {
        ...labelTextColor(semanticColors.buttonText),
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackground,
          border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryCompoundButtonBorder}`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonText),
          },
        },
        '&.ms-Button--compoundPrimary:focus': {
          backgroundColor: semanticColors.primaryButtonBackground,
          border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryCompoundButtonBorder}`,
          selectors: {
            ...labelTextColor(extendedSemanticColors.primaryButtonTextFocused),
          },
        },
        '&.ms-Button--compound:focus': {
          backgroundColor: semanticColors.buttonBackground,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
          selectors: {
            ...labelTextColor(semanticColors.buttonText),
            '&.ms-Button--compound:hover': {
              backgroundColor: semanticColors.buttonBackgroundHovered,
            },
          },
        },
      },
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
      selectors: {
        '&.ms-Button--compound:hover': {
          selectors: {
            ...labelTextColor(semanticColors.buttonTextHovered),
          },
        },
        '&.ms-Button--compoundPrimary:hover': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBackgroundHovered}`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextHovered),
          },
        },
      },
    },
    rootPressed: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      selectors: {
        '&.ms-Button--compound:active': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          borderColor: semanticColors.buttonBackgroundPressed,
          selectors: {
            ...labelTextColor(semanticColors.buttonTextPressed),
          },
        },
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBackgroundPressed}`,

          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextPressed),
          },
        },
      },
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      border: '0px',
      selectors: {
        ...labelTextColor(semanticColors.buttonTextDisabled),
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
          border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled}`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextDisabled),
          },
        },
        '&.ms-Button--compound': {
          border: extendedSemanticColors.primaryButtonBorderDisabled,
        },
      },
    },
    rootChecked: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      selectors: {
        ...labelTextColor(semanticColors.buttonTextPressed),
        '&.ms-Button--compoundPrimary.is-checked': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextPressed),
          },
        },
      },
    },
    rootCheckedHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      selectors: {
        ...labelTextColor(semanticColors.buttonTextHovered),
        '&.ms-Button--compoundPrimary.is-checked:hover': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextHovered),
          },
        },
      },
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.buttonTextPressed}`,
      selectors: {
        ...labelTextColor(semanticColors.buttonTextPressed),
        '&.ms-Button--compoundPrimary.is-checked:active': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextPressed),
          },
        },
      },
    },
    rootCheckedDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      border: '0px',
      selectors: {
        ...labelTextColor(semanticColors.buttonTextDisabled),
        '&.ms-Button--compoundPrimary.is-checked.is-disabled': {
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          selectors: {
            ...labelTextColor(semanticColors.buttonTextDisabled),
          },
        },
      },
    },
  };
};
