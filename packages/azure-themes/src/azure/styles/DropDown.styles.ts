import { IDropdownStyleProps, IDropdownStyles } from '@fluentui/react/lib/Dropdown';
import { Depths } from '../AzureDepths';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const DropdownStyles = (props: IDropdownStyleProps): Partial<IDropdownStyles> => {
  const { disabled, theme, hasError, isOpen } = props;

  if (!theme) {
    return {};
  }
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;
  return {
    root: {
      selectors: {
        '.ms-Dropdown': {
          height: StyleConstants.inputControlHeight,
        },
      },
    },
    callout: {
      border: 'none',
      boxShadow: Depths.depth8,
      selectors: {
        ['.ms-Callout-main']: {
          backgroundColor: semanticColors.inputBackground,
          borderColor: semanticColors.inputBorder,
          borderStyle: StyleConstants.borderSolid,
          borderWidth: 0,
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
        fontSize: theme.fonts.medium.fontSize,
        height: StyleConstants.dropDownItemHeight,
        color: semanticColors.inputText,
        border: 0,
        selectors: {
          ':focus::after, :focus, :active': {
            borderColor: extendedSemanticColors.controlFocus,
          },
        },
      },
      disabled && {
        borderWidth: '0px',
        color: semanticColors.primaryButtonTextDisabled,
        selectors: {
          ['.ms-Dropdown-title, .ms-Dropdown-titleIsPlaceHolder, .ms-Dropdown-caretDown']: {
            color: semanticColors.primaryButtonTextDisabled,
          },
        },
      },
      !disabled && {
        selectors: {
          ['.ms-Dropdown-title']: {
            color: semanticColors.bodyText,
            borderColor: semanticColors.inputPlaceholderText,
            backgroundColor: extendedSemanticColors.controlBackground,
          },
          ['.ms-Dropdown-titleIsPlaceHolder.ms-Dropdown-title']: {
            color: semanticColors.inputPlaceholderText,
          },
          ['&:hover .ms-Dropdown-title']: {
            color: extendedSemanticColors.commandBarButtonTextHover,
            borderColor: semanticColors.inputText,
          },
          ['&:focus .ms-Dropdown-title']: {
            borderColor: semanticColors.focusBorder,
          },
          ['&:active .ms-Dropdown-title']: {
            color: extendedSemanticColors.commandBarButtonTextHover,
            borderColor: semanticColors.focusBorder,
          },
          // CaretDown states are the same for focus, hover, active.
          ['&:hover .ms-Dropdown-caretDown, &:focus .ms-Dropdown-caretDown, &:active .ms-Dropdown-caretDown']: {
            color: semanticColors.inputText,
          },
        },
      },

      hasError && {
        selectors: {
          ['.ms-Dropdown-title']: {
            borderColor: semanticColors.errorText,
          },
        },
      },
    ],
    dropdownDivider: {
      backgroundColor: extendedSemanticColors.rowBorder,
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
      border: 0,
    },
    dropdownItem: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: extendedSemanticColors.controlBackground,
      selectors: {
        // active: Mouse down on the item, then drag outside.
        '&:hover, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
          borderColor: 'transparent',
          color: extendedSemanticColors.commandBarButtonTextHover,
        },
      },
    },
    dropdownItemDisabled: {
      color: semanticColors.primaryButtonTextDisabled,
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: extendedSemanticColors.controlBackground,
    },
    dropdownItemSelected: {
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: extendedSemanticColors.commandBarButtonTextHover,
      selectors: {
        '&:hover, &:focus, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
          borderColor: 'transparent',
        },
      },
    },
    dropdownItemHeader: {
      fontSize: theme.fonts.large.fontSize,
      color: semanticColors.inputText,
      fontWeight: '600',
      backgroundColor: extendedSemanticColors.controlBackground,
    },
    subComponentStyles: {
      panel: {},
      label: {},
      multiSelectItem: {
        root: {
          padding: 0,
          backgroundColor: extendedSemanticColors.controlBackground,
          selectors: {
            // active: Mouse down on the item, then drag outside.
            '&:hover, &:active, &:hover:focus': {
              backgroundColor: extendedSemanticColors.controlBackground,
            },
          },
        },
      },
    },
    errorMessage: {
      color: semanticColors.errorText,
      fontSize: theme.fonts.medium.fontSize,
    },
  };
};
