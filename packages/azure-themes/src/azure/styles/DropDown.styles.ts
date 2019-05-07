import { IDropdownStyleProps, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';
import { FontSizes } from '../AzureType';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';

export const DropdownStyles = (props: IDropdownStyleProps): Partial<IDropdownStyles> => {
  const { disabled, theme, hasError, isOpen } = props;
  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  return {
    callout: {
      border: 'none',
      boxShadow: Depths.depth8,
      selectors: {
        ['.ms-Callout-main']: {
          backgroundColor: semanticColors.inputBackground,
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: StyleConstants.borderWidth
        }
      }
    },
    caretDownWrapper: {
      right: 8,
      height: StyleConstants.inputControlHeightInner,
      lineHeight: StyleConstants.inputControlHeight
    },
    caretDown: {
      color: semanticColors.inputText
    },
    dropdown: [
      {
        fontSize: FontSizes.size12,
        height: StyleConstants.inputControlHeight,
        color: semanticColors.inputText,
        selectors: {
          ['.ms-Dropdown-titleIsPlaceHolder']: {
            color: semanticColors.inputPlaceholderText,
            fontStyle: 'italic'
          },
          ['&:hover .ms-Dropdown-titleIsPlaceHolder']: {
            color: semanticColors.inputPlaceholderText,
            fontStyle: 'italic'
          }
        }
      },
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        borderColor: semanticColors.inputBorder,
        borderStyle: 'solid',
        borderWidth: '1px'
      },
      !disabled && {
        selectors: {
          ['&:hover .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.inputBorderHovered
          },
          ['&:focus .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.focusBorder
          },
          ['&:active .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.inputBorder
          },
          // CaretDown states are the same for focus, hover, active.
          ['&:hover .ms-Dropdown-caretDown, &:focus .ms-Dropdown-caretDown, &:active .ms-Dropdown-caretDown']: {
            color: semanticColors.inputText
          }
        }
      }
    ],
    dropdownDivider: {
      backgroundColor: semanticColors.inputBorder
    },
    title: [
      {
        height: StyleConstants.inputControlHeight,
        lineHeight: StyleConstants.inputControlHeight,
        borderColor: semanticColors.inputBorder,
        selectors: {
          span: {
            lineHeight: StyleConstants.inputControlHeightInner,
            position: 'absolute',
            top: '1px'
          }
        }
      },
      hasError && {
        borderColor: semanticColors.errorBackground,
        borderWidth: StyleConstants.borderWidthError
      },
      isOpen &&
        !hasError && {
          borderColor: semanticColors.inputBorder
        },
      disabled && {
        color: semanticColors.disabledBodyText
      }
    ],
    dropdownItemsWrapper: {
      backgroundColor: semanticColors.bodyBackground,
      borderColor: semanticColors.inputBorder
    },
    dropdownItem: {
      color: semanticColors.bodyText,
      fontSize: FontSizes.size12,
      selectors: {
        '&:hover': {
          borderColor: 'transparent'
        },
        '&:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
          color: semanticColors.bodyText,
          borderColor: 'transparent'
        }
      }
    },
    dropdownItemDisabled: {
      color: semanticColors.disabledBodyText,
      fontSize: FontSizes.size12
    },
    dropdownItemSelected: {
      fontSize: FontSizes.size12,
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: semanticColors.bodyText,
      fontWeight: 'bold',
      selectors: {
        '&:hover': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
          borderColor: 'transparent'
        },
        '&:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
          borderColor: 'transparent',
          color: semanticColors.bodyText
        }
      }
    },
    dropdownItemHeader: {
      color: semanticColors.focusBorder
    },
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: FontSizes.size12
    }
  };
};
