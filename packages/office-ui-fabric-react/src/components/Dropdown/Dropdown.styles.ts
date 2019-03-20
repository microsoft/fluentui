import { IDropdownStyles, IDropdownStyleProps } from './Dropdown.types';
import { IStyleFunction } from '../../Utilities';
import { FontSizes, FontWeights, HighContrastSelector, IRawStyle, IStyle, getGlobalClassNames, normalize } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Dropdown-container',
  label: 'ms-Dropdown-label',
  dropdown: 'ms-Dropdown',
  title: 'ms-Dropdown-title',
  caretDownWrapper: 'ms-Dropdown-caretDownWrapper',
  caretDown: 'ms-Dropdown-caretDown',
  callout: 'ms-Dropdown-callout',
  panel: 'ms-Dropdown-panel',
  dropdownItems: 'ms-Dropdown-items',
  dropdownItem: 'ms-Dropdown-item',
  dropdownDivider: 'ms-Dropdown-divider',
  dropdownOptionText: 'ms-Dropdown-optionText',
  dropdownItemHeader: 'ms-Dropdown-header',
  titleIsPlaceHolder: 'ms-Dropdown-titleIsPlaceHolder',
  titleHasError: 'ms-Dropdown-title--hasError'
};

const DROPDOWN_HEIGHT = 32;
const DROPDOWN_ITEM_HEIGHT = 32;

const highContrastAdjustMixin = {
  // highContrastAdjust mixin
  '@media screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: black-on-white)': {
    MsHighContrastAdjust: 'none'
  }
};

const highContrastItemAndTitleStateMixin: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'HighlightText',
      selectors: {
        ':hover': {
          color: 'HighlightText' // overrides the hover styling for buttons that are also selected
        }
      }
    },
    ...highContrastAdjustMixin
  }
};

const highContrastBorderState: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      borderColor: 'Highlight'
    }
  }
};

export const getStyles: IStyleFunction<IDropdownStyleProps, IDropdownStyles> = props => {
  const { theme, hasError, className, isOpen, disabled, required, isRenderingPlaceholder, panelClassName, calloutClassName } = props;

  if (!theme) {
    throw new Error('theme is undefined or null in base Dropdown getStyles function.');
  }

  const globalClassnames = getGlobalClassNames(GlobalClassNames, theme);
  const { palette, semanticColors } = theme;

  const rootHoverFocusActiveSelectorNeutralDarkMixin: IStyle = {
    color: palette.neutralDark
  };

  const rootHoverFocusActiveSelectorBodySubtextMixin: IStyle = {
    color: semanticColors.bodySubtext
  };

  const borderColorError: IStyle = {
    borderColor: semanticColors.errorText
  };

  const dropdownItemStyle: IStyle = [
    globalClassnames.dropdownItem,
    {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'block',
      padding: '4px 16px',
      width: '100%',
      minHeight: DROPDOWN_ITEM_HEIGHT,
      lineHeight: 20,
      height: 'auto',
      position: 'relative',
      border: '1px solid transparent',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      textAlign: 'left'
    }
  ];

  const dropdownItemSelected: IStyle = [
    ...dropdownItemStyle,
    {
      backgroundColor: palette.neutralQuaternaryAlt,
      color: palette.black
    },
    highContrastItemAndTitleStateMixin
  ];

  const dropdownItemDisabled: IStyle = [
    ...dropdownItemStyle,
    {
      color: semanticColors.disabledText,
      cursor: 'default'
    }
  ];

  return {
    root: globalClassnames.root,
    label: globalClassnames.label,
    dropdown: [
      globalClassnames.dropdown,
      normalize,
      {
        ...theme.fonts.medium,
        color: palette.neutralPrimary,
        position: 'relative',
        outline: 0,
        userSelect: 'none',
        selectors: {
          ['&:hover .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { borderColor: palette.neutralDark },
            highContrastBorderState
          ],
          ['&:focus .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { borderColor: palette.themePrimary },
            highContrastItemAndTitleStateMixin
          ],
          ['&:active .' + globalClassnames.title]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { borderColor: palette.themeDark },
            highContrastBorderState
          ],

          ['&:hover .' + globalClassnames.caretDown]: !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
          ['&:focus .' + globalClassnames.caretDown]: [
            !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,
            { selectors: { [HighContrastSelector]: { color: 'HighlightText' }, ...highContrastAdjustMixin } }
          ],
          ['&:active .' + globalClassnames.caretDown]: !disabled && rootHoverFocusActiveSelectorNeutralDarkMixin,

          ['&:hover .' + globalClassnames.titleIsPlaceHolder]: rootHoverFocusActiveSelectorBodySubtextMixin,
          ['&:focus .' + globalClassnames.titleIsPlaceHolder]: rootHoverFocusActiveSelectorBodySubtextMixin,
          ['&:active .' + globalClassnames.titleIsPlaceHolder]: rootHoverFocusActiveSelectorBodySubtextMixin,

          ['&:hover .' + globalClassnames.titleHasError]: borderColorError,
          ['&:active .' + globalClassnames.titleHasError]: borderColorError,
          ['&:focus .' + globalClassnames.titleHasError]: borderColorError
        }
      },
      className,
      isOpen && 'is-open',
      disabled && 'is-disabled',
      required && 'is-required'
    ],
    title: [
      globalClassnames.title,
      normalize,
      {
        backgroundColor: semanticColors.inputBackground,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: semanticColors.inputBorder,
        cursor: 'pointer',
        display: 'block',
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2,
        padding: `0 ${DROPDOWN_HEIGHT}px 0 12px`,
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      isRenderingPlaceholder && [globalClassnames.titleIsPlaceHolder, { color: semanticColors.inputPlaceholderText }],
      hasError && [globalClassnames.titleHasError, borderColorError],
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        border: 'none',
        color: semanticColors.disabledText,
        cursor: 'default',
        selectors: { [HighContrastSelector]: { border: '1px solid GrayText', color: 'GrayText' } }
      }
    ],
    caretDownWrapper: [
      globalClassnames.caretDownWrapper,
      {
        position: 'absolute',
        top: 1,
        right: 12,
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2 // height minus the border
      },
      !disabled && {
        cursor: 'pointer'
      }
    ],
    caretDown: [
      globalClassnames.caretDown,
      { color: palette.neutralSecondary, fontSize: FontSizes.small, pointerEvents: 'none' },
      disabled && { color: semanticColors.disabledText, selectors: { [HighContrastSelector]: { color: 'GrayText' } } }
    ],
    errorMessage: { color: semanticColors.errorText, ...theme.fonts.small, paddingTop: 5 },
    callout: [
      globalClassnames.callout,
      {
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.2)',
        border: `1px solid ${palette.neutralLight}`
      },
      calloutClassName
    ],
    dropdownItemsWrapper: { selectors: { '&:focus': { outline: 0 } } },
    dropdownItems: [globalClassnames.dropdownItems, { display: 'block' }],
    dropdownItem: [
      ...dropdownItemStyle,
      {
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Window'
          },
          '&:hover': {
            color: 'inherit'
          },
          '&:focus': {
            backgroundColor: semanticColors.listItemBackgroundHovered
          },
          '&:active': {
            backgroundColor: semanticColors.listHeaderBackgroundHovered,
            color: palette.black
          }
        }
      }
    ],
    dropdownItemSelected: dropdownItemSelected,
    dropdownItemDisabled: dropdownItemDisabled,
    dropdownItemSelectedAndDisabled: [dropdownItemSelected, dropdownItemDisabled, { backgroundColor: 'transparent' }],
    dropdownDivider: [globalClassnames.dropdownDivider, { height: 1, backgroundColor: semanticColors.bodyDivider }],
    dropdownOptionText: [
      globalClassnames.dropdownOptionText,
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        minWidth: 0,
        maxWidth: '100%',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        margin: '1px'
      }
    ],
    dropdownItemHeader: [
      globalClassnames.dropdownItemHeader,
      {
        ...theme.fonts.medium,
        fontWeight: FontWeights.semibold,
        color: semanticColors.menuHeader,
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        height: DROPDOWN_ITEM_HEIGHT,
        lineHeight: DROPDOWN_ITEM_HEIGHT,
        cursor: 'default',
        padding: '0px 16px',
        userSelect: 'none',
        textAlign: 'left'
      }
    ],
    subComponentStyles: {
      label: { root: { display: 'inline-block' } },
      panel: {
        root: [panelClassName],
        main: {
          // Force drop shadow even under medium breakpoint
          boxShadow: '-30px 0px 30px -30px rgba(0,0,0,0.2)'
        },
        contentInner: { padding: '0 0 20px' }
      }
    }
  };
};
