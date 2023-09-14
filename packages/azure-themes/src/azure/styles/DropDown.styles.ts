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
            borderColor: semanticColors.inputBorder,
            backgroundColor: extendedSemanticColors.controlBackground,
          },
          ['.ms-Dropdown-titleIsPlaceHolder.ms-Dropdown-title']: {
            color: semanticColors.inputPlaceholderText,
          },
          ['&:hover .ms-Dropdown-title']: {
            color: extendedSemanticColors.bodyText,
            borderColor: semanticColors.inputText,
          },
          ['&:focus .ms-Dropdown-title']: {
            borderColor: semanticColors.focusBorder,
          },
          ['&:active .ms-Dropdown-title']: {
            color: semanticColors.bodyText,
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
        borderWidth: StyleConstants.borderWidth,
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
      backgroundColor: extendedSemanticColors.dropdownBackground,
      borderColor: semanticColors.inputBorder,
      border: 0,
    },
    dropdownItem: {
      color: semanticColors.bodyText,
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: extendedSemanticColors.dropdownBackground,
      selectors: {
        // active: Mouse down on the item, then drag outside.
        '&:hover, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundHovered,
          borderColor: 'transparent',
          color: extendedSemanticColors.dropdownTextHovered,
        },
        // unselected  multi-choice item
        '&.ms-Checkbox': {
          color: extendedSemanticColors.bodyText,
          backgroundColor: extendedSemanticColors.dropdownBackground,
        },
        // unselected  multi-choice hovered item
        '&.ms-Checkbox:hover': {
          color: extendedSemanticColors.dropdownTextHovered,
          backgroundColor: extendedSemanticColors.listItemBackgroundHovered,
        },
      },
    },
    dropdownItemDisabled: {
      color: semanticColors.primaryButtonTextDisabled,
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: extendedSemanticColors.dropdownBackground,
      selectors: {
        // multi select drop down disabled items
        '&.ms-Checkbox': {
          backgroundColor: extendedSemanticColors.dropdownBackground,
        },
        // multi select drop down disabled items hovered
        '&.ms-Checkbox:hover': {
          backgroundColor: extendedSemanticColors.dropdownBackground,
        },
      },
    },
    dropdownItemSelected: {
      fontSize: theme.fonts.medium.fontSize,
      backgroundColor: semanticColors.listItemBackgroundChecked,
      color: extendedSemanticColors.bodyText,
      selectors: {
        '&:hover, &:focus, &:active, &:hover:focus': {
          backgroundColor: semanticColors.listItemBackgroundChecked,
          borderColor: 'transparent',
        },
        // multi select drop down items
        '&.ms-Checkbox': {
          backgroundColor: extendedSemanticColors.dropdownBackground,
        },
        // multi select drop down items hovered
        '&.ms-Checkbox:hover': {
          backgroundColor: extendedSemanticColors.listItemBackgroundHovered,
          color: extendedSemanticColors.dropdownTextHovered,
        },
      },
    },
    dropdownItemHeader: {
      color: semanticColors.inputText,
      fontWeight: '600',
      backgroundColor: extendedSemanticColors.dropdownBackground,
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
