import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';

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
      fontSize: FontSizes.size13,
      backgroundColor: semanticColors.buttonBackground,
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderColor}`,
      color: semanticColors.buttonText,
      selectors: {
        ...labelTextColor(semanticColors.buttonText),
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.buttonText,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonText),
          },
        },
      },
    },
    rootHovered: {
      backgroundColor: semanticColors.buttonBackgroundHovered,
      selectors: {
        '&.ms-Button--compound:hover': {
          backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
          selectors: {
            ...labelTextColor(extendedSemanticColors.textHovered),
          },
        },
        '&.ms-Button--compoundPrimary:hover': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextHovered),
          },
        },
      },
    },
    rootPressed: {
      selectors: {
        '&.ms-Button--compound:active': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          selectors: {
            ...labelTextColor(semanticColors.buttonText),
          },
        },
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: '#000000', //semanticColors.primaryButtonTextPressed,
          border: '0px',
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
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          selectors: {
            ...labelTextColor(semanticColors.buttonTextDisabled),
          },
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
        '&.ms-Button--compound.is-checked': {
          borderColor: extendedSemanticColors.buttonBorderColor,
          backgroundColor: semanticColors.buttonBackgroundPressed,
          color: semanticColors.buttonText,
          selectors: {
            ...labelTextColor(semanticColors.buttonText),
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
        '&.ms-Button--compound.is-checked:hover': {
          backgroundColor: extendedSemanticColors.buttonBackgroundHoveredDefault,
          border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.buttonBorderHovered}`,
          selectors: {
            //...labelTextColor(semanticColors.primaryButtonTextHovered)
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
        '&.ms-Button--compound.is-checked:active': {
          borderColor: extendedSemanticColors.buttonBorderColor,
          backgroundColor: semanticColors.buttonBackgroundPressed,
          color: semanticColors.buttonText,
          selectors: {
            //...labelTextColor(semanticColors.primaryButtonTextPressed)
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
