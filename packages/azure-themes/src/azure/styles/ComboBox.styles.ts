import { ITheme } from 'office-ui-fabric-react/lib/Styling';
import { Depths } from '../AzureDepths';
import { IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const ComboBoxStyles = (theme: ITheme): Partial<IComboBoxStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      height: StyleConstants.inputControlHeight,
      fontSize: FontSizes.size12,
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.bodyBackground,
          color: semanticColors.inputText
        },
        '.ms-Button:hover': {
          backgroundColor: semanticColors.bodyBackground,
          color: semanticColors.inputText
        },
        '&.is-open': {
          borderColor: semanticColors.focusBorder
        },
        '.ms-Button-icon': {
          height: StyleConstants.inputControlHeightInner
        }
      }
    },
    input: {
      height: StyleConstants.inputControlHeightInner,
      selectors: {
        '::placeholder': {
          fontStyle: 'italic'
        },
        '::-ms-input-placeholder': {
          fontStyle: 'italic'
        }
      }
    },
    rootDisabled: {
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.inputText
        },
        '.ms-Button:hover': {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.inputText
        }
      }
    },
    rootFocused: {
      borderColor: semanticColors.focusBorder
    },
    rootError: {
      borderColor: semanticColors.errorBackground,
      borderWidth: StyleConstants.borderWidthError
    },
    rootPressed: {
      borderColor: semanticColors.focusBorder
    },
    callout: {
      border: 'none',
      boxShadow: Depths.depth8,
      selectors: {
        '.ms-Callout-main': {
          backgroundColor: semanticColors.inputBackground,
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth
        }
      }
    },
    divider: {
      backgroundColor: semanticColors.inputBorder,
      border: 'none',
      height: '1px'
    },
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: FontSizes.size12
    },
    optionsContainer: {
      verticalAlign: 'middle',
      selectors: {
        '.ms-ComboBox-header': {
          color: semanticColors.focusBorder,
          fontSize: FontSizes.size12
        },
        '.ms-ComboBox-option': {
          color: semanticColors.bodyText,
          fontSize: FontSizes.size12,
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.menuItemBackgroundHovered,
              border: '1px solid transparent',
              color: semanticColors.bodyText
            }
          }
        },
        '.is-checked': {
          backgroundColor: semanticColors.listItemBackgroundChecked
        },
        '.is-disabled': {
          color: semanticColors.disabledBodyText
        }
      }
    }
  };
};
