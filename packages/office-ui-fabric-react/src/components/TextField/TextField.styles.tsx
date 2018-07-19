import {
  AnimationClassNames,
  FontSizes,
  getGlobalClassNames,
  HighContrastSelector,
  IStyle,
  normalize
} from '../../Styling';
import { ILabelStyles } from '../../Label';
import { ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';
import { IStyleFunctionOrObject } from '@uifabric/utilities';
import { ILabelStyleProps } from 'office-ui-fabric-react/lib/components/Label';

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

// TODO: ideally we shouldn't have to do this through a styles prop..
//          modify label to take in new props for disabled, required, underlined, etc.
function getLabelStyles(props: ITextFieldStyleProps): IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles> {
  const { underlined, disabled } = props;
  return () => ({
    root: [
      underlined &&
        disabled && {
          // line 321 start
          color: props.theme.palette.neutralTertiary
          // line 321 end
        },
      underlined && {
        // line 294 start
        fontSize: FontSizes.medium,
        marginRight: 8,
        paddingLeft: 12,
        paddingRight: 0, // line 420
        lineHeight: '22px',
        height: 32
        // line 298 end
      }
    ]
  });
}

// TODO: broken things
//    FIXED: hover is not showing border for underlined like it does on master
//    FIXED: active is not showing blue border for underlined like it does on master
//    FIXED: border is appearing on disabled (but not for underlined)
//    FIXED: border is blue on active in master even when hovered, not black

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

  const { semanticColors, palette } = theme;

  const classNames = getGlobalClassNames(globalClassNames, theme);

  const fieldPrefixSuffix: IStyle = {
    // line 143 start
    background: palette.neutralLighter,
    color: palette.neutralSecondary,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    lineHeight: 1,
    whiteSpace: 'nowrap'
    // line 149 end
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
      // line 51 start
      normalize,
      {
        position: 'relative',
        selectors: {
          [HighContrastSelector]: {
            // line 234 start
            borderWidth: 2
            // line 234 end
          }
        }
      },
      // line 54 end

      // line 234 start
      focused && {
        borderColor: semanticColors.inputFocusBorderAlt
      },
      // line 234 end

      // line 267 start
      underlined &&
        !focused && {
          border: `0px solid ${semanticColors.inputBorder}`
        },
      // line 267 end

      // line 341 start
      underlined &&
        !disabled &&
        !focused && {
          selectors: {
            ':hover': {
              borderColor: semanticColors.inputBorderHovered
            }
          }
        },
      // line 341 end
      className
    ],
    wrapper: [
      classNames.wrapper,
      // line 272 start
      underlined && {
        display: 'flex',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'inherit',
        width: '100%'
      },
      // line 276 end

      // line 412 start
      hasErrorMessage && {
        borderColor: semanticColors.errorText,
        selectors: {
          '&:focus, &:hover': {
            borderColor: semanticColors.errorText
          }
        }
      },
      // line 412 end

      // line 287 start
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
      // line 287 end

      // line 313 start
      underlined &&
        disabled && {
          borderBottomColor: semanticColors.disabledBackground
        },
      // line 313 end

      // line 357 start
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
      // line 359 end

      // line 357 start
      underlined &&
        focused && {
          selectors: {
            [HighContrastSelector]: {
              borderColor: 'Highlight'
            }
          }
        }
      // line 359 end
    ],
    fieldGroup: [
      classNames.fieldGroup,
      // line 66 start
      normalize,
      {
        border: `1px solid ${semanticColors.inputBorder}`,
        background: semanticColors.bodyBackground,
        height: 32,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        position: 'relative',
        // line 73 end

        selectors: {
          // line 115 start
          ':-ms-clear': {
            display: 'none'
          },
          // line 117 end
          ':hover': {
            selectors: {
              // line 108 start
              [HighContrastSelector]: {
                borderColor: 'Highlight'
              }
              // line 110 end
            }
          },
          // line 125 start
          '::placeholder': {
            color: semanticColors.inputPlaceholderText,
            opacity: 1
          },
          ':-ms-input-placeholder': {
            color: semanticColors.inputPlaceholderText,
            opacity: 1
          }
          // line 126 end
        }
      },
      // line 369 start
      multiline && {
        minHeight: '60px',
        height: 'auto',
        display: 'flex'
      },
      // line 371 end
      borderless && {
        // line 259 start
        borderColor: 'transparent',
        borderWidth: 0
        // line 260 end
      },
      !focused &&
        !disabled && {
          selectors: {
            // line 117 end
            ':hover': {
              // line 78 start
              borderColor: semanticColors.inputBorderHovered
              // line 78 end
            }
          }
        },
      focused && {
        // line 84 start
        borderColor: semanticColors.inputFocusBorderAlt,
        // line 84 end

        selectors: {
          [HighContrastSelector]: {
            // line 84 start
            borderWidth: 2,
            // line 84 end

            // line 108 start
            borderColor: 'Highlight'
            // line 110 end
          }
        }
      },
      disabled && {
        // line 98 start
        backgroundColor: semanticColors.disabledBackground,
        borderColor: semanticColors.disabledBackground
        // line 99 end
      },
      // line 304 start
      underlined && {
        flex: '1 1 0px',
        borderWidth: 0,
        textAlign: 'left'
      },
      // line 307 end

      // line 334 start
      underlined &&
        disabled && {
          backgroundColor: 'transparent'
        },
      // line 334 end

      // line 412 start
      hasErrorMessage && {
        borderColor: semanticColors.errorText,
        selectors: {
          '&:focus, &:hover': {
            borderColor: semanticColors.errorText
          }
        }
      },
      // line 412 end

      // line 91 start
      hasErrorMessage &&
        focused && {
          borderColor: semanticColors.errorText
        },
      // line 91 end

      !hasLabel &&
        required && {
          selectors: {
            // line 219 start
            ':after': {
              content: `'*'`,
              color: semanticColors.errorText,
              position: 'absolute',
              top: -5,
              right: -10
            }
            // line 225 end
          }
        }
    ],
    field: [
      classNames.field,
      // line 155 start
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
        // line 173 end
        selectors: {
          // line 180 start
          '&:active, &:focus, &:hover': { outline: 0 },
          // line 180 end

          // line 199 start
          '::placeholder': {
            color: semanticColors.bodySubtext
          }
          // line 199 end
        }
      },
      // line 442 start
      multiline &&
        !resizable && [
          classNames.unresizable,
          {
            resize: 'none'
          }
        ],
      // line 442 end

      // line 377 start
      multiline && {
        lineHeight: 17,
        flexGrow: 1,
        paddingTop: 6,
        overflow: 'auto',
        width: '100%'
      },
      // line 381 end

      // line 184 start
      hasIcon && {
        paddingRight: 24
      },
      // line 186 end

      // line 386 start
      multiline &&
        hasIcon && {
          paddingRight: 40
        },
      // line 386 end

      disabled && {
        // line 135 start
        // TODO: should this be removed? can't find it taking effect in master
        //        and is overridden by transparent rule anyways
        // backgroundColor: semanticColors.disabledBackground,
        // borderColor: semanticColors.disabledBackground,
        // line 136 end

        // line 191 start
        backgroundColor: 'transparent',
        borderColor: 'transparent'
        // line 191 end
      },
      // line 426 start
      underlined && {
        textAlign: 'left'
      },
      // line 426 end

      // line 327 start
      underlined &&
        disabled && {
          backgroundColor: 'transparent',
          color: semanticColors.disabledText
        },
      // line 328 end
      focused && {
        selectors: {
          // line 84, 234 start
          [HighContrastSelector]: {
            padding: '0 11px 0 11px'
          }
          // line 84, 234 end
        }
      }
    ],
    icon: [
      // line 434 start
      multiline && {
        paddingRight: 24,
        paddingBottom: 8,
        alignItems: 'flex-end'
      },
      // line 436 end
      {
        // line 240 start
        pointerEvents: 'none',
        position: 'absolute',
        bottom: 5,
        right: 8,
        top: 'auto',
        fontSize: 16,
        lineHeight: 18
        // line 246 end
      }
    ],
    description: [
      classNames.description,
      {
        // line 252 start
        color: semanticColors.bodySubtext,
        fontSize: FontSizes.xSmall
        // line 253 end
      }
    ],
    errorMessage: [
      classNames.errorMessage,
      AnimationClassNames.slideDownIn20,
      // line 395 start
      theme.fonts.small,
      {
        color: semanticColors.errorText,
        margin: 0,
        paddingTop: 5,
        display: 'flex',
        alignItems: 'center'
      }
      // line 400 end
    ],
    // line 143 start
    prefix: [classNames.prefix, fieldPrefixSuffix],
    suffix: [classNames.suffix, fieldPrefixSuffix],
    subComponentStyles: {
      label: getLabelStyles(props)
    }
    // line 149 end

    // TODO: resolve
    // label: getLabelStyles(props)
  };
}
