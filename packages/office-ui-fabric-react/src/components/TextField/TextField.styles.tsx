import {
  FontSizes,
  IRawStyle,
  hiddenContentStyle,
  HighContrastSelector
} from '../../Styling';
import { TextFieldBase } from './TextField.base';
import { ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';

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
    hasErrorMessage
  } = props;

  // use shared normalize once master merged into 6.0
  const normalize: IRawStyle = {
    boxShadow: 'none',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  };

  const { semanticColors, palette } = props.theme;

  return {
    root: [
      'ms-TextField',
      required && 'is-required',
      disabled && 'is-disabled',
      focused && 'is-acitve',
      multiline && 'ms-TextField--multiline',
      borderless && 'ms-TextField--borderless',
      underlined && 'ms-Textfield--underlined',
      normalize,
      {
        position: 'relative'
      },
      focused && {
        borderColor: semanticColors.inputFocusBorderAlt
      },
      multiline && hasIcon && {
        paddingRight: 40,
      },
      underlined && {
        borderWidth: 0
      },
      underlined && focused && {
        borderColor: semanticColors.inputFocusBorderAlt,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight'
          }
        }
      },
      underlined && !disabled && {
        selectors: {
          ':hover': {
            borderColor: semanticColors.inputBorderHovered
          },
          [HighContrastSelector]: {
            borderColor: 'Highlight'
          }
        }
      }
    ],
    wrapper: [
      hasErrorMessage && underlined && {
        borderBottom: `1px solid ${semanticColors.errorText}`,
        selectors: {
          ':focus': {
            borderBottom: `1px solid ${semanticColors.errorText}`,
          },
          ':hover': {
            borderBottom: `1px solid ${semanticColors.errorText}`,
          }
        }
      },
      underlined && {
        display: 'flex',
        borderBottom: `1px solid ${semanticColors.inputBorder}`,
        width: '100%'
      },
      underlined && disabled && {
        borderBottomColor: semanticColors.disabledBackground
      }
    ],
    fieldGroup: [
      'ms-TextField-fieldGroup',
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
          ':-ms-clear': {
            display: 'none'
          },
          ':hover': {
            borderColor: semanticColors.inputBorderHovered,
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
        display: 'flex',
      },
      borderless && {
        borderColor: 'transparent',
        borderWidth: 0
      },
      focused && {
        borderColor: semanticColors.inputFocusBorderAlt,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'Highlight'
          }
        }
      },
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        borderColor: semanticColors.disabledBackground,
        pointerEvents: 'none',
        cursor: 'default'
      },
      underlined && {
        flex: '1 1 0px',
        borderWidth: 0,
        textAlign: 'left'
      },
      underlined && disabled && {
        backgroundColor: 'transparent'
      },
      hasErrorMessage && !underlined && {
        border: `1px solid ${semanticColors.errorText}`,
        selectors: {
          ':focus': {
            border: `1px solid ${semanticColors.errorText}`,
          },
          ':hover': {
            border: `1px solid ${semanticColors.errorText}`,
          }
        }
      }
    ],
    field: [
      normalize,
      'ms-TextField-field',
      {
        fontSize: FontSizes.medium,
        borderRadius: 0,
        border: 'none',
        background: 'none',
        color: semanticColors.bodyText,
        padding: '0 12px',
        width: '100%',
        textOverflow: 'ellipsis',
        outline: 0,
        selectors: {
          ':active': { outline: 0 },
          ':focus': { outline: 0 },
          ':hover': { outline: 0 },
          ':placeholder': {
            color: semanticColors.disabledText
          }
        }
      },
      multiline && !resizable && [
        'ms-Textfield-field--unresizable',
        {
          resize: 'none'
        }
      ],
      multiline && {
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        overflow: 'auto',
        width: '100%'
      },
      hasIcon && {
        paddingRight: 24
      },
      disabled && {
        backgroundColor: semanticColors.disabledBackground,
        borderColor: semanticColors.disabledBackground,
        pointerEvents: 'none',
        cursor: 'default'
      },
      underlined && disabled && {
        backgroundColor: 'transparent',
        color: semanticColors.disabledText
      }
    ],
    icon: [
      {
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 5,
        right: 8,
        top: 'auto',
        fontSize: 16,
        lineHeight: 18,
      }
    ],
    description: [
      'ms-TextField-description',
      {
        color: semanticColors.bodySubtext,
        fontSize: FontSizes.xSmall
      }
    ],
    errorMessage: [
      'ms-TextField-errorMessage',
      {
        fontSize: FontSizes.small,
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center',
      }
    ],
    prefix: [
      'ms-TextField-prefix',
      {
        background: palette.neutralLighter,
        color: palette.neutralSecondary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        lineHeight: 1
      }
    ],
    suffix: [
      'ms-TextField-suffix',
      {
        background: palette.neutralLighter,
        color: palette.neutralSecondary,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        lineHeight: 1
      }
    ],
    label: {
      background: 'pink'
    }
  }
}
