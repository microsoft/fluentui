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
          // dropdown container
          backgroundColor: semanticColors.inputBackground,
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: '0',
        },
      },
    },
    caretDownWrapper: {
      right: 8,
      height: StyleConstants.inputControlHeightInner,
      lineHeight: StyleConstants.inputControlHeight,
    },
    caretDown: [
      {
        color: semanticColors.inputText,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
    dropdown: [
      {
        fontSize: FontSizes.size13,
        height: StyleConstants.inputControlHeight,
        color: semanticColors.inputText,

        selectors: {
          ':focus::after, :focus': {
            borderColor: semanticColors.primaryButtonBackground,
          },
          ['.ms-Dropdown-titleIsPlaceHolder']: {
            color: semanticColors.inputPlaceholderText,
          },
          ['&:hover .ms-Dropdown-titleIsPlaceHolder']: {
            color: semanticColors.inputPlaceholderText,
            borderColor: semanticColors.inputBorderHovered,
          },
        },
      },
      disabled && {
        borderWidth: '0px',
      },
      !disabled && {
        selectors: {
          ['&:hover .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.inputBorderHovered,
          },
          ['&:focus .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.focusBorder,
          },
          ['&:active .ms-Dropdown-title']: {
            color: semanticColors.inputText,
            borderColor: semanticColors.inputBorder,
          },
          // CaretDown states are the same for focus, hover, active.
          ['&:hover .ms-Dropdown-caretDown, &:focus .ms-Dropdown-caretDown, &:active .ms-Dropdown-caretDown']: {
            color: semanticColors.inputText,
          },
        },
      },
    ],
    dropdownDivider: {
      backgroundColor: semanticColors.inputBorder,
    },
    title: [
      {
        height: StyleConstants.inputControlHeight,
        lineHeight: '21px',
        borderColor: semanticColors.inputBorder,
        selectors: {
          span: {
            lineHeight: StyleConstants.inputControlHeight,
            position: 'absolute',
            // top: '10px',
          },
        },
      },
      hasError && {
        borderColor: semanticColors.errorBackground,
        borderWidth: StyleConstants.borderWidthError,
      },
      isOpen &&
        !hasError && {
          borderColor: semanticColors.inputBorder,
        },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
    dropdownItemsWrapper: {
      backgroundColor: semanticColors.bodyBackground,
      borderColor: semanticColors.inputBorder,
    },
    dropdownItem: {
      color: semanticColors.bodyText,
      fontSize: FontSizes.size13,
      selectors: {
        // active: Mouse down on the item, then drag outside.
        '&:hover, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
          borderColor: 'transparent',
          color: semanticColors.bodyText,
        },
      },
    },
    dropdownItemDisabled: {
      color: semanticColors.disabledBodyText,
      fontSize: FontSizes.size13,
    },
    dropdownItemSelected: {
      fontSize: FontSizes.size13,
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: semanticColors.bodyText,
      selectors: {
        '&:hover, &:focus, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
          borderColor: 'transparent',
          color: semanticColors.bodyText,
        },
      },
    },
    dropdownItemHeader: {
      color: semanticColors.primaryButtonBackground,
      fontWeight: '400',
    },
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: FontSizes.size13,
    },
  };
};
