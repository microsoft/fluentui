import { IDropdownStyles, IDropdownStyleProps } from './Dropdown.types';
import { IStyleFunction } from '../../Utilities';
import { IStyle, normalize, HighContrastSelector, FontSizes, IRawStyle, FontWeights } from '../../Styling';

const DROPDOWN_HEIGHT = 32;
const DROPDOWN_ITEMHEIGHT = 32;

const highContrastAdjustMixin = {
  // highContrastAdjust mixin
  '@media screen and (-ms-high-contrast: active),  screen and (-ms-high-contrast: black-on-white)': {
    MsHighContrastAdjust: 'none'
  }
};

const highContrastItemAndTitleStateMixin: IRawStyle = {
  selectors: {
    [HighContrastSelector]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'Highlight'
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
  const {
    theme,
    hasError,
    className,
    isOpen,
    disabled,
    required,
    isRenderingPlaceholder,
    panelClassName,
    calloutClassName
  } = props;

  if (!theme) {
    throw new Error('theme is undefined');
  }

  const rootHoverFocusActiveSelectorNeutralDarkMixin: IStyle = {
    color: theme.palette.neutralDark
  };

  const rootHoverFocusActiveSelectorNeutralSecondaryMixin: IStyle = {
    color: theme.palette.neutralSecondary
  };

  const borderColorError: IStyle = {
    borderColor: theme.semanticColors.errorText
  };

  const dropdownItemStyle: IStyle = [
    'ms-Dropdown-item',
    {
      background: 'transparent',
      boxSizing: 'border-box',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
      minHeight: DROPDOWN_ITEMHEIGHT,
      lineHeight: 20,
      height: 'auto',
      padding: '4px 16px',
      position: 'relative',
      border: '1px solid transparent',
      wordWrap: 'break-word',
      overflowWrap: 'break-word',
      textAlign: 'left',
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Window'
        },
        '&:hover': {
          color: 'inherit'
        },
        '&:focus': {
          backgroundColor: theme.semanticColors.listItemBackgroundHovered
        },
        '&:active': {
          backgroundColor: theme.semanticColors.listHeaderBackgroundHovered,
          color: theme.palette.black
        }
      }
    }
  ];

  return {
    root: [
      'ms-Dropdown',
      normalize,
      {
        ...theme.fonts.medium,
        color: theme.palette.neutralPrimary,
        position: 'relative',
        outline: 0,
        userSelect: 'none',
        selectors: {
          '&:hover .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.neutralDark
            },
            highContrastBorderState
          ],
          '&:focus .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.themePrimary
            },
            highContrastItemAndTitleStateMixin
          ],
          '&:active .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.themeDark
            },
            highContrastBorderState
          ],

          '&:hover .caretDown': rootHoverFocusActiveSelectorNeutralDarkMixin,
          '&:focus .caretDown': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText'
                },
                ...highContrastAdjustMixin
              }
            }
          ],
          '&:active .caretDown': rootHoverFocusActiveSelectorNeutralDarkMixin,

          '&:hover .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,
          '&:focus .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,
          '&:active .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,

          '&:hover .titleIsError': borderColorError,
          '&:active .titleIsError': borderColorError,
          '&:focus .titleIsError': borderColorError
        }
      },
      className,
      isOpen && 'is-open',
      disabled && 'is-disabled',
      required && 'is-required'
    ],
    title: [
      'ms-Dropdown-title',
      normalize,
      {
        backgroundColor: theme.semanticColors.inputBackground,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.semanticColors.inputBorder,
        cursor: 'pointer',
        display: 'block',
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2,
        padding: `0 ${DROPDOWN_HEIGHT} 0 12`,
        position: 'relative',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      isRenderingPlaceholder && [
        'ms-Dropdown-titleIsPlaceHolder',
        {
          color: theme.semanticColors.inputPlaceholderText
        }
      ],
      hasError && borderColorError
    ],
    caretDownWrapper: [
      'ms-Dropdown-caretDownWrapper',
      {
        position: 'absolute',
        top: 1,
        right: 12,
        height: DROPDOWN_HEIGHT,
        lineHeight: DROPDOWN_HEIGHT - 2 // height minus the border
      }
    ],
    caretDown: [
      'ms-Dropdown-caretDown',
      {
        color: theme.palette.neutralSecondary,
        fontSize: FontSizes.small,
        pointerEvents: 'none'
      }
    ],
    errorMessage: {
      color: theme.semanticColors.errorText,
      ...theme.fonts.small,
      paddingTop: 5
    },
    callout: [
      'ms-Dropdown-callout',
      {
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.2)',
        border: `1px solid ${theme.palette.neutralLight}`
      },
      calloutClassName
    ],
    panel: [
      'ms-Dropdown-panel',
      {
        // TODO: use subcomponentstyles when panel is converted to us js styling.
        selectors: {
          '& .ms-Panel-main': {
            // Force drop shadow even under medium breakpoint
            boxShadow: '-30px 0px 30px -30px rgba(0,0,0,0.2)'
          },
          '& .ms-Panel-contentInner': {
            padding: '0 0 20px'
          }
        }
      },
      panelClassName
    ],
    dropdownItemsWrapper: {
      selectors: {
        '&:focus': {
          outline: 0
        }
      }
    },
    dropdownItems: [
      'ms-Dropdown-items',
      {
        display: 'block'
      }
    ],
    dropdownItem: ['ms-Dropdown-item', dropdownItemStyle],
    dropdownItemSelected: [
      dropdownItemStyle,
      {
        backgroundColor: theme.palette.neutralQuaternaryAlt,
        color: theme.palette.black
      },
      highContrastItemAndTitleStateMixin
    ],
    dropdownItemDisabled: [
      dropdownItemStyle,
      {
        color: theme.semanticColors.disabledText,
        cursor: 'default'
      }
    ],
    dropdownDivider: [
      'ms-Dropdown-divider',
      {
        height: 1,
        backgroundColor: theme.semanticColors.bodyDivider
      }
    ],
    dropdownOptionText: [
      'ms-Dropdown-optionText',
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
      'ms-Dropdown-header',
      {
        ...theme.fonts.medium,
        fontWeight: FontWeights.semibold,
        color: theme.semanticColors.menuHeader,
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        height: DROPDOWN_ITEMHEIGHT,
        lineHeight: DROPDOWN_ITEMHEIGHT,
        cursor: 'default',
        padding: '0px 16px',
        userSelect: 'none',
        textAlign: 'left'
      }
    ],
    subComponentStyles: {
      label: {
        root: {
          display: 'inline-block',
          marginBottom: 8
        }
      }
    }
  };
};
