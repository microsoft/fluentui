import { FontSizes, FontWeights, HighContrastSelector, IStyle, IPalette, getGlobalClassNames } from '../../../Styling';
import { IsFocusVisibleClassName } from '../../../Utilities';
import { IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types';

const GlobalClassNames = {
  root: 'ms-ChoiceField',
  choiceFieldWrapper: 'ms-ChoiceField-wrapper',
  input: 'ms-ChoiceField-input',
  field: 'ms-ChoiceField-field',
  innerField: 'ms-ChoiceField-innerField',
  imageWrapper: 'ms-ChoiceField-imageWrapper',
  iconWrapper: 'ms-ChoiceField-iconWrapper',
  labelWrapper: 'ms-ChoiceField-labelWrapper',
  checked: 'is-checked'
};

const labelWrapperLineHeight = 15;
const iconSize = 32;
const choiceFieldSize = 20;
const choiceFieldTransitionDuration = '200ms';
const choiceFieldTransitionTiming = 'cubic-bezier(.4, 0, .23, 1)';
const radioButtonSpacing = 3;
const radioButtonInnerSize = 5;

function getChoiceGroupFocusStyle(palette: Partial<IPalette>, hasIconOrImage?: boolean): IStyle {
  return [
    'is-inFocus',
    {
      selectors: {
        [`.${IsFocusVisibleClassName} &`]: {
          position: 'relative',
          outline: 'transparent',
          selectors: {
            '::-moz-focus-inner': {
              border: 0
            },
            ':after': {
              content: '""',
              top: -2,
              right: -2,
              bottom: -2,
              left: -2,
              pointerEvents: 'none',
              border: '1px solid ' + (hasIconOrImage ? palette.neutralSecondary : palette.neutralPrimary),
              position: 'absolute',
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'WindowText',
                  borderWidth: hasIconOrImage ? 1 : 2
                }
              }
            }
          }
        }
      }
    }
  ];
}

function getImageWrapperStyle(isSelectedImageWrapper: boolean, className?: string, checked?: boolean): IStyle {
  return [
    className,
    {
      paddingBottom: 2,
      transitionProperty: 'opacity',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: 'ease',
      selectors: {
        '.ms-Image': {
          display: 'inline-block',
          borderStyle: 'none'
        }
      }
    },
    (checked ? !isSelectedImageWrapper : isSelectedImageWrapper) && [
      'is-hidden',
      {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        opacity: 0
      }
    ]
  ];
}

export const getStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { theme, hasIcon, hasImage, checked, disabled, imageIsLarge, focused } = props;
  const { palette, semanticColors } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const fieldHoverOrFocusProperties = {
    selectors: {
      '.ms-ChoiceFieldLabel': {
        color: semanticColors.bodyTextChecked
      },
      ':before': {
        borderColor: checked ? semanticColors.inputBackgroundCheckedHovered : semanticColors.inputBorderHovered
      }
    }
  };

  const enabledFieldWithImageHoverOrFocusProperties = {
    borderColor: checked ? palette.themeDark : palette.neutralTertiaryAlt,
    selectors: {
      ':before': {
        opacity: 1,
        borderColor: checked ? palette.themeDark : semanticColors.inputBorderHovered
      }
    }
  };

  const circleAreaProperties: IStyle = [
    {
      content: '""',
      display: 'inline-block',
      backgroundColor: semanticColors.bodyBackground,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: semanticColors.smallInputBorder,
      width: choiceFieldSize,
      height: choiceFieldSize,
      fontWeight: 'normal',
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      transitionProperty: 'border-color',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: choiceFieldTransitionTiming,
      borderRadius: '50%'
    },
    disabled && {
      backgroundColor: checked ? semanticColors.bodyBackground : semanticColors.disabledText,
      borderColor: semanticColors.disabledText,
      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText'
        }
      }
    },
    checked && {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: disabled ? semanticColors.disabledText : semanticColors.inputBackgroundChecked,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight'
        }
      }
    },
    (hasIcon || hasImage) && {
      top: radioButtonSpacing,
      right: radioButtonSpacing,
      left: 'auto', // To reset the value of 'left' to its default value, so that 'right' works
      opacity: !disabled && checked ? 1 : 0
    }
  ];

  const dotAreaProperties: IStyle = [
    {
      content: '""',
      width: 0,
      height: 0,
      borderRadius: '50%',
      position: 'absolute',
      left: choiceFieldSize / 2,
      right: 0,
      transitionProperty: 'border-width',
      transitionDuration: choiceFieldTransitionDuration,
      transitionTimingFunction: choiceFieldTransitionTiming,
      boxSizing: 'border-box'
    },
    checked && {
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: disabled ? semanticColors.disabledText : semanticColors.inputBackgroundChecked,
      left: 5,
      top: 5,
      width: 10,
      height: 10,
      selectors: {
        [HighContrastSelector]: {
          borderColor: 'Highlight'
        }
      }
    },
    checked &&
      (hasIcon || hasImage) && {
        top: radioButtonSpacing + radioButtonInnerSize,
        right: radioButtonSpacing + radioButtonInnerSize,
        left: 'auto' // To reset the value of 'left' to its default value, so that 'right' works
      }
  ];

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        color: semanticColors.bodyText,
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular,
        minHeight: 26,
        border: 'none',
        position: 'relative',
        marginTop: 8,
        selectors: {
          '.ms-ChoiceFieldLabel': {
            fontSize: FontSizes.medium,
            display: 'inline-block'
          }
        }
      },
      !hasIcon &&
        !hasImage && {
          selectors: {
            '.ms-ChoiceFieldLabel': {
              paddingLeft: '26px'
            }
          }
        },
      hasImage && 'ms-ChoiceField--image',
      hasIcon && 'ms-ChoiceField--icon',
      (hasIcon || hasImage) && {
        display: 'inline-flex',
        fontSize: 0,
        margin: '0 4px 4px 0',
        paddingLeft: 0,
        backgroundColor: palette.neutralLighter,
        height: '100%'
      }
    ],
    choiceFieldWrapper: [classNames.choiceFieldWrapper, focused && getChoiceGroupFocusStyle(palette, hasIcon || hasImage)],
    // The hidden input
    input: [
      classNames.input,
      {
        position: 'absolute',
        opacity: 0,
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        margin: 0
      }
    ],
    field: [
      classNames.field,
      checked && classNames.checked,
      {
        display: 'inline-block',
        cursor: 'pointer',
        marginTop: 0,
        position: 'relative',
        verticalAlign: 'top',
        userSelect: 'none',
        minHeight: 20,
        selectors: {
          ':hover': !disabled && fieldHoverOrFocusProperties,
          ':focus': !disabled && fieldHoverOrFocusProperties,

          // The circle
          ':before': circleAreaProperties,

          // The dot
          ':after': dotAreaProperties
        }
      },
      hasIcon && 'ms-ChoiceField--icon',
      hasImage && 'ms-ChoiceField-field--image',
      (hasIcon || hasImage) && {
        boxSizing: 'content-box',
        cursor: 'pointer',
        paddingTop: 22,
        margin: 0,
        textAlign: 'center',
        transitionProperty: 'all',
        transitionDuration: choiceFieldTransitionDuration,
        transitionTimingFunction: 'ease',
        border: '2px solid transparent',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      },
      checked && {
        borderColor: palette.themePrimary
      },
      (hasIcon || hasImage) &&
        !disabled && {
          selectors: {
            ':hover': enabledFieldWithImageHoverOrFocusProperties,
            ':focus': enabledFieldWithImageHoverOrFocusProperties
          }
        },
      disabled && {
        cursor: 'default',
        selectors: {
          '.ms-ChoiceFieldLabel': {
            color: semanticColors.disabledBodyText
          },
          [HighContrastSelector]: {
            color: 'GrayText'
          }
        }
      }
    ],
    innerField: [
      classNames.innerField,
      (hasIcon || hasImage) && {
        position: 'relative',
        display: 'inline-block',
        paddingLeft: 30,
        paddingRight: 30
      },
      (hasIcon || hasImage) &&
        imageIsLarge && {
          paddingLeft: 24,
          paddingRight: 24
        },
      (hasIcon || hasImage) &&
        disabled && {
          opacity: 0.25,
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              opacity: 1
            }
          }
        }
    ],
    imageWrapper: getImageWrapperStyle(false, classNames.imageWrapper, checked),
    selectedImageWrapper: getImageWrapperStyle(true, classNames.imageWrapper, checked),
    iconWrapper: [
      classNames.iconWrapper,
      {
        fontSize: iconSize,
        lineHeight: iconSize,
        height: iconSize
      }
    ],
    labelWrapper: [
      classNames.labelWrapper,
      (hasIcon || hasImage) && {
        display: 'block',
        position: 'relative',
        margin: '4px 8px',
        height: labelWrapperLineHeight * 2,
        lineHeight: labelWrapperLineHeight,
        overflow: 'hidden',
        whiteSpace: 'pre-wrap',
        textOverflow: 'ellipsis',
        fontSize: FontSizes.medium,
        fontWeight: FontWeights.regular
      }
    ]
  };
};
