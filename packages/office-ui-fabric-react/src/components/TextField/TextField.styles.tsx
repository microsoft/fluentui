import { AnimationClassNames, FontSizes, getGlobalClassNames, HighContrastSelector, IStyle, normalize } from '../../Styling';
import { ILabelStyles, ILabelStyleProps } from '../../Label';
import { ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';
import { IStyleFunctionOrObject } from '@uifabric/utilities';

const globalClassNames = {
  root: 'ms-TextField',
  description: 'ms-TextField-description',
  errorMessage: 'ms-TextField-errorMessage',
  field: 'ms-TextField-field',
  fieldGroup: 'ms-TextField-fieldGroup',
  prefix: 'ms-TextField-prefix',
  suffix: 'ms-TextField-suffix',
  wrapper: 'ms-TextField-wrapper',

  multiline: 'ms-TextField--multiline',
  borderless: 'ms-TextField--borderless',
  underlined: 'ms-TextField--underlined',
  unresizable: 'ms-TextField--unresizable',

  required: 'is-required',
  disabled: 'is-disabled',
  active: 'is-active'
};

function getLabelStyles(props: ITextFieldStyleProps): IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles> {
  const { underlined, disabled } = props;
  return () => ({
    root: [
      underlined &&
        disabled && {
          color: props.theme.palette.neutralTertiary
        },
      underlined && {
        fontSize: FontSizes.medium,
        marginRight: 8,
        paddingLeft: 12,
        paddingRight: 0,
        lineHeight: '22px',
        height: 32
      }
    ]
  });
}

export function getStyles(props: ITextFieldStyleProps): ITextFieldStyles {
  const {
    theme,
    className,
    disabled,
    focused,
    required,
    multiline,
    hasLabel,
    borderless,
    underlined,
    hasIcon,
    resizable,
    hasErrorMessage,
    iconClass,
    inputClassName,
    autoAdjustHeight
  } = props;

  const { semanticColors, palette } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  const fieldPrefixSuffix: IStyle = {
    background: palette.neutralLighter,
    color: palette.neutralSecondary,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    lineHeight: 1,
    whiteSpace: 'nowrap'
  };

  return {
    root: [
      classNames.root,
      required && classNames.required,
      disabled && classNames.disabled,
      focused && classNames.active,
      multiline && classNames.multiline,
      borderless && classNames.borderless,
      underlined && classNames.underlined,
      normalize,
      {
        position: 'relative',
        selectors: {
          [HighContrastSelector]: {
            borderWidth: 2
          }
        }
      },
      focused && {
        borderColor: semanticColors.inputFocusBorderAlt
      },
      underlined &&
        !focused && {
          border: `0px solid ${semanticColors.inputBorder}`
        },
      underlined &&
        !disabled &&
        !focused && {
          selectors: {
            ':hover': {
              borderColor: semanticColors.inputBorderHovered
            }
          }
        },
      className
    ],
    wrapper: [
      classNames.wrapper,
      underlined && {
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'inherit',
        width: '100%'
      },
      hasErrorMessage && {
        borderColor: semanticColors.errorText,
        selectors: {
          '&:focus, &:hover': {
            borderColor: semanticColors.errorText
          }
        }
      },
      hasErrorMessage &&
        underlined &&
        !disabled && {
          borderBottom: `1px solid ${semanticColors.errorText}`,
          selectors: {
            ':focus': {
              borderBottom: `1px solid ${semanticColors.errorText}`
            },
            ':hover': {
              borderBottom: `1px solid ${semanticColors.errorText}`
            }
          }
        },
      underlined &&
        disabled && {
          borderBottomColor: semanticColors.disabledBackground
        },
      underlined &&
        !disabled && {
          selectors: {
            ':hover': {
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'Highlight'
                }
              }
            }
          }
        },
      underlined &&
        focused && {
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'Highlight'
            }
          }
        }
    ],
    fieldGroup: [
      classNames.fieldGroup,
      normalize,
      {
        border: `1px solid ${semanticColors.inputBorder}`,
        background: semanticColors.bodyBackground,
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
        selectors: {
          ':hover': {
            selectors: {
              [HighContrastSelector]: {
                borderColor: 'Highlight'
              }
            }
          }
        }
      },
      multiline && {
        minHeight: '60px',
        height: 'auto',
        display: 'flex'
      },
      borderless && {
        borderColor: 'transparent',
        borderWidth: 0
      },
      !focused &&
        !disabled && {
          selectors: {
            ':hover': {
              borderColor: semanticColors.inputBorderHovered
            }
          }
        },
      focused && {
        borderColor: semanticColors.inputFocusBorderAlt,
        selectors: {
          [HighContrastSelector]: {
            borderWidth: 2,
            borderColor: 'Highlight'
          }
        }
      },
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        borderColor: semanticColors.disabledBackground
      },
      underlined && {
        flex: '1 1 0px',
        borderWidth: 0,
        textAlign: 'left'
      },
      underlined &&
        disabled && {
          backgroundColor: 'transparent'
        },
      hasErrorMessage && {
        borderColor: semanticColors.errorText,
        selectors: {
          '&:focus, &:hover': {
            borderColor: semanticColors.errorText
          }
        }
      },
      hasErrorMessage &&
        focused && {
          borderColor: semanticColors.errorText
        },
      !hasLabel &&
        required && {
          selectors: {
            ':after': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10
            }
          }
        }
    ],
    field: [
      classNames.field,
      normalize,
      {
        fontSize: FontSizes.medium,
        borderRadius: 0,
        border: 'none',
        background: 'none',
        backgroundColor: 'transparent',
        color: semanticColors.bodyText,
        padding: '0 12px',
        width: '100%',
        minWidth: 0,
        textOverflow: 'ellipsis',
        outline: 0,
        selectors: {
          '&:active, &:focus, &:hover': { outline: 0 },
          '::-ms-clear': {
            display: 'none'
          },
          '::placeholder': {
            color: semanticColors.inputPlaceholderText,
            opacity: 1
          },
          ':-ms-input-placeholder': {
            color: semanticColors.inputPlaceholderText,
            opacity: 1
          }
        }
      },
      multiline &&
        !resizable && [
          classNames.unresizable,
          {
            resize: 'none'
          }
        ],
      multiline && {
        minHeight: 'inherit',
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        overflow: 'auto',
        width: '100%'
      },
      multiline &&
        autoAdjustHeight && {
          overflow: 'hidden'
        },
      hasIcon && {
        paddingRight: 24
      },
      multiline &&
        hasIcon && {
          paddingRight: 40
        },
      disabled && {
        backgroundColor: 'transparent',
        borderColor: 'transparent'
      },
      underlined && {
        textAlign: 'left'
      },
      underlined &&
        disabled && {
          backgroundColor: 'transparent',
          color: semanticColors.disabledText
        },
      focused && {
        selectors: {
          [HighContrastSelector]: {
            padding: '0 11px 0 11px'
          }
        }
      },
      inputClassName
    ],
    icon: [
      multiline && {
        paddingRight: 24,
        paddingBottom: 8,
        alignItems: 'flex-end'
      },
      {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 5,
        right: 8,
        top: 'auto',
        fontSize: 16,
        lineHeight: 18
      },
      iconClass
    ],
    description: [
      classNames.description,
      {
        color: semanticColors.bodySubtext,
        fontSize: FontSizes.xSmall
      }
    ],
    errorMessage: [
      classNames.errorMessage,
      AnimationClassNames.slideDownIn20,
      theme.fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center'
      }
    ],
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    subComponentStyles: {
      label: getLabelStyles(props)
    }
  };
}
