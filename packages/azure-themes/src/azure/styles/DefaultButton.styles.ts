import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { FontSizes } from '../AzureType';

export const DefaultButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      fontSize: FontSizes.size13,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonText,
      selectors: {
        // standard button
        '&.is-expanded': {
          color: semanticColors.buttonText,
        },
      },
    },
    rootDisabled: {
      backgroundColor: semanticColors.buttonBackgroundDisabled,
      color: semanticColors.buttonTextDisabled,
      border: `0px`,
    },
    rootHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
    },
    rootPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonTextHovered,
    },
    rootChecked: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonTextHovered,
    },
    rootCheckedHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
      backgroundColor: semanticColors.buttonBackgroundHovered,
      color: semanticColors.buttonTextHovered,
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonTextHovered,
    },
    splitButtonContainer: {
      selectors: {
        // standard button
        '.ms-Button--default': {
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
          borderRight: '0 !important',
        },
        // standard button dropdown
        '.ms-Button--default + .ms-Button': {
          backgroundColor: semanticColors.buttonBackground,
          color: semanticColors.buttonText,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
          borderLeft: 'none',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.buttonText,
            },
          },
        },
        // standard button divider
        '.ms-Button--default + .ms-Button + span': {
          backgroundColor: semanticColors.buttonTextHovered,
        },
        // primary button
        '.ms-Button--primary': {
          border: 'none',
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.primaryButtonText,
        },
        // primary button dropdown
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.primaryButtonText,
          border: 'none',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonText,
            },
          },
        },
        // primary button divider
        '.ms-Button--primary + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonText,
        },
        // disabled primary action
        '.ms-Button.is-disabled': {
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          color: semanticColors.buttonTextDisabled,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonBackground,
        },
        // entire split button disabled - divider
        '.ms-Button.is-disabled + .ms-Button.is-disabled + span': {
          backgroundColor: semanticColors.buttonTextDisabled,
        },
      },
    },
    splitButtonContainerHovered: {
      selectors: {
        // primary button hover
        '.ms-Button--primary:not(.is-disabled)': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: 'none',
        },
        // primary button dropdown hover
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          border: 'none',
          color: semanticColors.primaryButtonTextHovered,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextHovered,
            },
            ':hover': {
              backgroundColor: semanticColors.primaryButtonBackgroundHovered,
              color: semanticColors.primaryButtonTextHovered,
              selectors: {
                '.ms-Button-menuIcon': {
                  color: semanticColors.primaryButtonTextHovered,
                },
              },
            },
          },
        },
        // secondary button hover
        '.ms-Button--default:not(.is-disabled)': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextHovered,
        },
        // secondary button dropdown hover
        '.ms-Button--default + .ms-Button': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderLeft: 'none',
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.buttonBackgroundHovered,
              color: semanticColors.buttonTextHovered,
              selectors: {
                '.ms-Button-menuIcon': {
                  color: semanticColors.buttonTextHovered,
                },
              },
            },
          },
        },
      },
    },
    splitButtonContainerDisabled: {
      selectors: {
        '.ms-Button': {
          border: 'none',
        },
        '.ms-Button--default + .ms-Button': {
          border: 'none',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.buttonTextDisabled,
            },
          },
        },
        '.ms-Button--primary + .ms-Button': {
          border: 'none',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.buttonTextDisabled,
            },
          },
        },
      },
    },
    splitButtonContainerChecked: {
      selectors: {
        // primary button checked
        '.ms-Button--primary:not(.is-disabled)': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          border: 'none',
        },
        // primary button dropdown checked
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextPressed,
            },
          },
        },
        // secondary button checked
        '.ms-Button--default:not(.is-disabled)': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextPressed,
        },
        // secondary button dropdown checked
        '.ms-Button--default + .ms-Button': {
          backgroundColor: semanticColors.buttonBackgroundPressed,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          color: semanticColors.buttonTextPressed,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.buttonTextPressed,
            },
          },
        },
        // primary button divider
        '.ms-Button--primary + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonTextPressed,
        },
        // standard button divider
        '.ms-Button--default + .ms-Button + span': {
          backgroundColor: semanticColors.buttonTextPressed,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
        },
      },
    },
    splitButtonContainerCheckedHovered: {
      selectors: {
        // primary button checked hovered
        '.ms-Button--primary:not(.is-disabled)': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: 'none',
        },
        // primary button dropdown checked hovered
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextHovered,
            },
          },
        },
        // secondary button checked hovered
        '.ms-Button--default:not(.is-disabled)': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextHovered,
        },
        // secondary button dropdown checked hovered
        '.ms-Button--default + .ms-Button': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
          color: semanticColors.buttonTextHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderLeft: 'none',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.buttonTextHovered,
            },
          },
        },
        // primary button divider
        '.ms-Button--primary + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonTextHovered,
        },
        // standard button divider
        '.ms-Button--default + .ms-Button + span': {
          backgroundColor: semanticColors.buttonTextHovered,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
        },
      },
    },
  };
};
