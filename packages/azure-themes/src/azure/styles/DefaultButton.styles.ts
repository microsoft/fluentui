import { IButtonStyles } from '@fluentui/react/lib/Button';
import * as StyleConstants from '../Constants';
import { ITheme } from '@fluentui/react/lib/Styling';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const DefaultButtonStyles = (theme: ITheme): Partial<IButtonStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      fontSize: theme.fonts.medium.fontSize,
      height: StyleConstants.inputControlHeight,
      padding: '0px 16px',
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      selectors: {
        // danger button
        '&.danger': {
          outlineColor: extendedSemanticColors.ButtonBackgroundDanger,
          borderColor: extendedSemanticColors.ButtonBorderDanger,
          backgroundColor: extendedSemanticColors.ButtonBackgroundDanger,
          color: extendedSemanticColors.ButtonBackgroundDangerText,
          selectors: {
            ':hover': {
              outlineColor: extendedSemanticColors.ButtonBackgroundDangerHovered,
              borderColor: `${extendedSemanticColors.ButtonBorderDangerHovered} !important`,
              backgroundColor: extendedSemanticColors.ButtonBackgroundDangerHovered,
              color: extendedSemanticColors.ButtonBackgroundDangerTextHovered,
            },
            ':active': {
              outlineColor: extendedSemanticColors.ButtonBackgroundDangerPressed,
              borderColor: `${extendedSemanticColors.ButtonBorderDangerPressed} !important`,
              backgroundColor: extendedSemanticColors.ButtonBackgroundDangerPressed,
              color: extendedSemanticColors.ButtonBackgroundDangerTextHovered,
            },
            ':focus': {
              outlineColor: extendedSemanticColors.ButtonBackgroundDangerPressed,
              borderColor: extendedSemanticColors.ButtonBorderDangerPressed,
              backgroundColor: extendedSemanticColors.ButtonBackgroundDangerPressed,
              color: extendedSemanticColors.ButtonBackgroundDangerTextHovered,
            },
          },
        },
        // tag button
        '&.tag': {
          outlineColor: extendedSemanticColors.ButtonBackgroundTag,
          borderColor: `${extendedSemanticColors.ButtonBorderTag} !important`,
          backgroundColor: extendedSemanticColors.ButtonBackgroundTag,
          color: extendedSemanticColors.ButtonBackgroundTagText,
          selectors: {
            ':hover': {
              outlineColor: extendedSemanticColors.ButtonBackgroundTagHovered,
              borderColor: `${extendedSemanticColors.ButtonBorderTagHovered} !important`,
              backgroundColor: extendedSemanticColors.ButtonBackgroundTagHovered,
              color: extendedSemanticColors.ButtonBackgroundTagTextHovered,
            },
            ':active': {
              outlineColor: extendedSemanticColors.ButtonBackgroundTagPressed,
              borderColor: extendedSemanticColors.ButtonBorderTagPressed,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              color: extendedSemanticColors.ButtonBackgroundTagTextHovered,
            },
            ':focus': {
              outlineColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              borderColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              backgroundColor: `${extendedSemanticColors.ButtonBackgroundTagPressed} !important`,
              color: `${extendedSemanticColors.ButtonBackgroundTagTextHovered} !important`,
            },
          },
        },
        // standard button
        '&.is-expanded': {
          color: semanticColors.buttonTextHovered,
          borderColor: semanticColors.inputBorderHovered,
        },
        '&.ms-Button--primary': {
          height: StyleConstants.inputControlHeight,
          padding: '0px 16px',
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
          selectors: {
            ':hover': {
              borderColor: semanticColors.primaryButtonBackgroundHovered,
            },
            ':active': {
              borderColor: semanticColors.primaryButtonBackgroundPressed,
            },
            ':focus': {
              backgroundColor: semanticColors.primaryButtonBackground,
              color: semanticColors.primaryButtonText,
              borderColor: extendedSemanticColors.primaryCompoundButtonBorder,
            },
          },
        },
        '&.ms-Button--primary.is-disabled': {
          border: `${StyleConstants.borderWidth} solid
          ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
        },
      },
    },
    rootFocused: {
      selectors: {
        '::after': {
          outlineColor: `${extendedSemanticColors.ButtonBorderFocus} !important`,
        },
      },
      backgroundColor: semanticColors.buttonBackground,
      color: semanticColors.buttonText,
      fill: semanticColors.buttonTextHovered,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
    },
    rootChecked: {
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.inputBorderPressed}`,
    },
    rootCheckedHovered: {
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
    },
    rootCheckedPressed: {
      backgroundColor: semanticColors.buttonBackgroundPressed,
      border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
      color: semanticColors.buttonTextHovered,
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      color: semanticColors.primaryButtonTextDisabled,
      border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled} !important`,
    },
    splitButtonContainer: {
      selectors: {
        // standard button
        '.ms-Button--default': {
          height: StyleConstants.inputControlHeight,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorder}`,
          borderRight: '0 !important',
        },
        // standard button dropdown
        '.ms-Button--default + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: '10px',
          backgroundColor: semanticColors.buttonTextHovered,
        },
        // primary button
        '.ms-Button--primary': {
          height: StyleConstants.inputControlHeight,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
          borderRight: '0 !important',
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.primaryButtonText,
        },
        // primary button dropdown
        '.ms-Button--primary + .ms-Button': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.primaryButtonBackground,
          color: semanticColors.primaryButtonText,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
          borderLeft: '0 !important',
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonText,
            },
          },
        },
        // primary button divider
        '.ms-Button--primary + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.primaryButtonText,
        },
        // disabled primary action
        '.ms-Button.is-disabled': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.buttonBackgroundDisabled,
          color: semanticColors.primaryButtonTextDisabled,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.primaryButtonBackground,
        },
        // entire split button disabled - divider
        '.ms-Button.is-disabled + .ms-Button.is-disabled + span': {
          height: '10px',
          backgroundColor: semanticColors.buttonTextDisabled,
        },
      },
    },
    splitButtonContainerHovered: {
      selectors: {
        // primary button hover
        '.ms-Button--primary:not(.is-disabled)': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.primaryButtonBorder}`,
        },
        // primary button dropdown hover
        '.ms-Button--primary + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.buttonBackgroundHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextHovered,
        },
        // secondary button dropdown hover
        '.ms-Button--default + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: StyleConstants.inputControlHeight,
          color: semanticColors.primaryButtonTextDisabled,
        },

        '.ms-Button--default + .ms-Button': {
          height: StyleConstants.inputControlHeight,
          border: `${StyleConstants.borderWidth} solid ${extendedSemanticColors.primaryButtonBorderDisabled}`,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextDisabled,
            },
          },
        },
        '.ms-Button--primary + .ms-Button': {
          height: StyleConstants.inputControlHeight,
          //border: '1px solid pink !important',  //"'none',
          color: semanticColors.primaryButtonTextDisabled,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextDisabled,
            },
          },
        },
      },
    },
    splitButtonContainerChecked: {
      selectors: {
        // primary button checked
        '.ms-Button--primary:not(.is-disabled)': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          border: 'none',
        },
        // primary button dropdown checked
        '.ms-Button--primary + .ms-Button': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
          color: semanticColors.primaryButtonTextPressed,
          borderColor: semanticColors.primaryButtonBackgroundPressed,
          selectors: {
            '.ms-Button-menuIcon': {
              color: semanticColors.primaryButtonTextPressed,
            },
          },
        },
        // secondary button checked
        '.ms-Button--default:not(.is-disabled)': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.buttonBackgroundPressed,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextPressed,
        },
        // secondary button dropdown checked
        '.ms-Button--default + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: '10px',
          backgroundColor: semanticColors.primaryButtonTextHovered,
        },
        // standard button divider
        '.ms-Button--default + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.buttonTextPressed,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.primaryButtonBackgroundPressed,
        },
      },
    },
    splitButtonContainerCheckedHovered: {
      selectors: {
        // primary button checked hovered
        '.ms-Button--primary:not(.is-disabled)': {
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
          color: semanticColors.primaryButtonTextHovered,
          border: 'none',
        },
        // primary button dropdown checked hovered
        '.ms-Button--primary + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: StyleConstants.inputControlHeight,
          backgroundColor: semanticColors.buttonBackgroundHovered,
          border: `${StyleConstants.borderWidth} solid ${semanticColors.inputBorderHovered}`,
          borderRight: 'none',
          color: semanticColors.buttonTextHovered,
        },
        // secondary button dropdown checked hovered
        '.ms-Button--default + .ms-Button': {
          height: StyleConstants.inputControlHeight,
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
          height: '10px',
          backgroundColor: semanticColors.primaryButtonTextHovered,
        },
        // standard button divider
        '.ms-Button--default + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.buttonTextHovered,
        },
        // primary function disabled, secondary enabled - divider
        '.ms-Button--primary.is-disabled + .ms-Button + span': {
          height: '10px',
          backgroundColor: semanticColors.primaryButtonBackgroundHovered,
        },
      },
    },
  };
};
