import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import * as StyleConstants from '../Constants';
import { FontSizes } from '../AzureType';

export const CompoundButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
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
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      selectors: {
        ...labelTextColor(semanticColors.buttonText),
        '&.ms-Button--compoundPrimary': {
          backgroundColor: semanticColors.primaryButtonBackground,
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonText),
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
          border: `0px`,
          selectors: {
            ...labelTextColor(semanticColors.primaryButtonTextHovered),
          },
        },
      },
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      selectors: {
        '&.ms-Button--compound:active': {
          selectors: {
            ...labelTextColor(semanticColors.buttonTextPressed),
          },
        },
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
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
