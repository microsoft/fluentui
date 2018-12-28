import { ITheme } from 'office-ui-fabric-react';
import { Depths } from '../AzureDepths';
import { IComboBoxStyles } from 'office-ui-fabric-react/lib/ComboBox';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const comboBoxStyles = (theme: ITheme): Partial<IComboBoxStyles> => {
  const { semanticColors } = theme;

  return {
    root: {
      fontSize: FontSizes.size12
    },
    rootFocused: {
      borderColor: semanticColors.focusBorder
    },
    rootError: {
      borderColor: semanticColors.errorBackground
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
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: FontSizes.size12
    },
    optionsContainer: {
      selectors: {
        '.ms-ComboBox-header': {
          color: semanticColors.focusBorder,
          fontSize: FontSizes.size12
        },
        '.ms-ComboBox-option': {
          color: semanticColors.bodyText,
          fontSize: FontSizes.size12,
          selectors: {
            '&:hover:focus': {
              backgroundColor: semanticColors.menuItemBackgroundHovered
            }
          }
        },
        '.is-checked': {
          backgroundColor: semanticColors.menuItemBackgroundChecked
        },
        '.is-disabled': {
          color: semanticColors.disabledBodyText
        }
      }
    }
  };
};
