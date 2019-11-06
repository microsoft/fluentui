import { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { HighContrastSelector, getGlobalClassNames, IStyle } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Checkbox',
  label: 'ms-Checkbox-label',
  checkbox: 'ms-Checkbox-checkbox',
  checkmark: 'ms-Checkbox-checkmark',
  text: 'ms-Checkbox-text'
};

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = (props: ICheckboxStyleProps): ICheckboxStyles => {
  const { className, theme, reversed, checked, disabled, isUsingCustomLabelRender, indeterminate } = props;
  const { semanticColors, effects, palette, fonts } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const checkmarkFontColor = semanticColors.inputForegroundChecked;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.inputBorder
  const checkmarkFontColorHovered = palette.neutralSecondary;
  // TODO: after updating the semanticColors slots mapping this needs to be semanticColors.smallInputBorder
  const checkboxBorderColor = palette.neutralPrimary;
  const checkboxBorderIndeterminateColor = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorDisabled = semanticColors.disabledBodySubtext;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBorderIndeterminateHoveredColor = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  // TODO: after updating the semanticColors slots mapping following 2 tokens need to be semanticColors.inputBackgroundCheckedHovered
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxHoveredTextColor = semanticColors.inputTextHovered;
  const checkboxBackgroundDisabledChecked = semanticColors.disabledBodySubtext;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  const indeterminateDotStyles: IStyle = [
    {
      content: '""',
      borderRadius: effects.roundedCorner2,
      position: 'absolute',
      width: 10,
      height: 10,
      top: 4,
      left: 4,
      boxSizing: 'border-box',
      borderWidth: 5,
      borderStyle: 'solid',
      borderColor: disabled ? checkboxBorderColorDisabled : checkboxBorderIndeterminateColor,
      transitionProperty: 'border-width, border, border-color',
      transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
      transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING
    }
  ];

  return {
    root: [
      classNames.root,
      {
        position: 'relative',
        display: 'flex'
      },
      reversed && 'reversed',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      !disabled && [
        !checked && {
          selectors: {
            [`:hover .${classNames.checkbox}`]: {
              borderColor: checkboxBorderHoveredColor,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'Highlight'
                }
              }
            },
            [`:focus .${classNames.checkbox}`]: { borderColor: checkboxBorderHoveredColor },
            [`:hover .${classNames.checkmark}`]: {
              color: checkmarkFontColorHovered,
              opacity: '1',
              selectors: {
                [HighContrastSelector]: {
                  color: 'Highlight'
                }
              }
            }
          }
        },
        checked &&
          !indeterminate && {
            selectors: {
              [`:hover .${classNames.checkbox}`]: {
                background: checkboxBackgroundCheckedHovered,
                borderColor: checkboxBorderColorCheckedHovered
              },
              [`:focus .${classNames.checkbox}`]: {
                background: checkboxBackgroundCheckedHovered,
                borderColor: checkboxBorderColorCheckedHovered
              },
              [`.${classNames.checkbox}`]: {
                background: checkboxBorderColorChecked,
                borderColor: checkboxBorderColorChecked
              },
              [HighContrastSelector]: {
                selectors: {
                  [`:hover .${classNames.checkbox}`]: {
                    background: 'Window',
                    borderColor: 'Highlight'
                  },
                  [`:focus .${classNames.checkbox}`]: {
                    background: 'Highlight'
                  },
                  [`:focus:hover .${classNames.checkbox}`]: {
                    background: 'Highlight'
                  },
                  [`:focus:hover .${classNames.checkmark}`]: {
                    color: 'Window'
                  },
                  [`:hover .${classNames.checkmark}`]: {
                    color: 'Highlight'
                  }
                }
              }
            }
          },
        indeterminate && {
          selectors: {
            [`:hover .${classNames.checkbox}, :hover .${classNames.checkbox}:after`]: {
              borderColor: checkboxBorderIndeterminateHoveredColor
            },
            [`:focus .${classNames.checkbox}`]: {
              borderColor: checkboxBorderIndeterminateHoveredColor
            },
            [`:hover .${classNames.checkmark}`]: {
              opacity: '0'
            }
          }
        },
        {
          selectors: {
            [`:hover .${classNames.text}`]: { color: checkboxHoveredTextColor },
            [`:focus .${classNames.text}`]: { color: checkboxHoveredTextColor }
          }
        }
      ],
      className
    ],
    input: {
      position: 'absolute',
      background: 'none',

      opacity: 0,
      selectors: {
        [`.${IsFocusVisibleClassName} &:focus + label::before`]: {
          outline: '1px solid ' + theme.palette.neutralSecondary,
          outlineOffset: '2px',
          selectors: {
            [HighContrastSelector]: {
              outline: '1px solid ActiveBorder'
            }
          }
        }
      }
    },
    label: [
      classNames.label,
      theme.fonts.medium,
      {
        display: 'flex',
        alignItems: isUsingCustomLabelRender ? 'center' : 'flex-start',
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        userSelect: 'none',
        textAlign: 'left'
      },
      reversed && {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
      },
      {
        selectors: {
          '&::before': {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            content: '""',
            pointerEvents: 'none'
          }
        }
      }
    ],
    checkbox: [
      classNames.checkbox,
      {
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: MS_CHECKBOX_LABEL_SIZE,
        width: MS_CHECKBOX_LABEL_SIZE,
        border: `1px solid ${checkboxBorderColor}`,
        borderRadius: effects.roundedCorner2,
        boxSizing: 'border-box',
        transitionProperty: 'background, border, border-color',
        transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
        transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,

        /* in case the icon is bigger than the box */
        overflow: 'hidden',
        selectors: {
          ':after': indeterminate ? indeterminateDotStyles : null
        }
      },
      indeterminate && {
        borderColor: checkboxBorderIndeterminateColor
      },
      !reversed
        ? // this margin on the checkbox is for backwards compat.
          // notably it has the effect where a customRender is used, there will be only a 4px margin from checkbox to label.
          // the label by default would have another 4px margin for a total of 8px margin between checkbox and label.
          // we don't combine the two (and move it into the text) to not incur a breaking change for everyone using custom render atm.
          {
            marginRight: 4
          }
        : {
            marginLeft: 4
          },
      !disabled &&
        !indeterminate &&
        checked && {
          background: checkboxBackgroundChecked,
          borderColor: checkboxBorderColorChecked,
          selectors: {
            [HighContrastSelector]: {
              background: 'Highlight',
              borderColor: 'Highlight'
            }
          }
        },
      disabled && {
        borderColor: checkboxBorderColorDisabled,
        selectors: {
          [HighContrastSelector]: {
            borderColor: 'InactiveBorder'
          }
        }
      },
      checked &&
        disabled && {
          background: checkboxBackgroundDisabledChecked,
          borderColor: checkboxBorderColorDisabled
        }
    ],
    checkmark: [
      classNames.checkmark,
      {
        opacity: checked ? '1' : '0',
        color: checkmarkFontColor,
        selectors: {
          [HighContrastSelector]: {
            color: disabled ? 'InactiveBorder' : 'Window',
            MsHighContrastAdjust: 'none'
          }
        }
      }
    ],
    text: [
      classNames.text,
      {
        color: disabled ? checkboxTextColorDisabled : checkboxTextColor,
        fontSize: fonts.medium.fontSize,
        lineHeight: '20px'
      },
      !reversed
        ? {
            marginLeft: 4
          }
        : {
            marginRight: 4
          },
      disabled && {
        selectors: {
          [HighContrastSelector]: {
            // backwards compat for the color of the text when the checkbox was rendered
            // using a Button.
            color: 'InactiveBorder'
          }
        }
      }
    ]
  };
};
