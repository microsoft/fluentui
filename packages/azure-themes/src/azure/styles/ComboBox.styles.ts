import { ITheme } from '@fluentui/react/lib/Styling';
import { Depths } from '../AzureDepths';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const ComboBoxStyles = (theme: ITheme): Partial<IComboBoxStyles> => {
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    root: {
      height: StyleConstants.inputControlHeight,
      fontSize: theme.fonts.medium.fontSize,
      lineHeight: StyleConstants.inputControlHeight,
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.bodyBackground,
          color: semanticColors.inputText,
          paddingTop: '5px',
        },
        '.ms-Button:hover': {
          backgroundColor: semanticColors.buttonBackgroundHovered,
        },
        '&.is-open': {
          borderColor: semanticColors.focusBorder,
        },
        '.ms-Button-icon': {
          height: StyleConstants.inputControlHeightInner,
        },
      },
    },
    input: {
      height: StyleConstants.inputControlHeightInner,
      selectors: {
        '::placeholder': {
          fontStyle: 'italic',
        },
        '::-ms-input-placeholder': {
          fontStyle: 'italic',
        },
      },
    },
    rootDisabled: {
      backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      selectors: {
        '.ms-Button': {
          backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
          color: semanticColors.inputText,
        },
        '.ms-Button:hover': {
          backgroundColor: semanticColors.disabledBackground,
          color: semanticColors.inputText,
        },
        '.ms-ComboBox-Input': {
          backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
          color: semanticColors.primaryButtonTextDisabled,
        },
      },
    },
    rootFocused: {
      borderColor: semanticColors.focusBorder,
    },
    rootError: {
      borderColor: semanticColors.errorBackground,
      borderWidth: StyleConstants.borderWidth,
    },
    rootPressed: {
      borderColor: semanticColors.focusBorder,
    },
    callout: {
      boxShadow: Depths.depth8,
    },
    divider: {
      backgroundColor: semanticColors.inputBorder,
      border: 'none',
      height: '1px',
    },
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: theme.fonts.medium.fontSize,
    },
    optionsContainer: {
      verticalAlign: 'middle',
      border: 'none',
      selectors: {
        '.ms-ComboBox-divider': {
          backgroundColor: extendedSemanticColors.rowBorder,
        },
        '.ms-ComboBox-header': {
          color: semanticColors.inputText,
          fontSize: theme.fonts.medium.fontSize,
        },
        '.ms-ComboBox-option': {
          color: semanticColors.bodyText,
          fontSize: theme.fonts.medium.fontSize,
          selectors: {
            ':hover': {
              backgroundColor: semanticColors.menuItemBackgroundHovered,
              border: '1px solid transparent',
              color: extendedSemanticColors.buttonTextHovered,
            },
          },
        },
        '.is-checked': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
        },
        '.is-disabled': {
          color: semanticColors.disabledBodyText,
        },
      },
    },
  };
};
