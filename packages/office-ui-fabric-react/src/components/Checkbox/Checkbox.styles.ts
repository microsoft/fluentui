import { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { FontSizes, HighContrastSelector } from '../../Styling';
import { IsFocusVisibleClassName } from '../../Utilities';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = (props: ICheckboxStyleProps): ICheckboxStyles => {
  const { className, theme, reversed, checked, disabled, isUsingCustomLabelRender } = props;
  const { semanticColors } = theme;
  const checkmarkFontColor = semanticColors.inputForegroundChecked;
  const checkmarkFontColorCheckedDisabled = semanticColors.disabledBackground;
  const checkmarkFontColorHovered = semanticColors.inputBorder;
  const checkboxBorderColor = semanticColors.smallInputBorder;
  const checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorDisabled = semanticColors.disabledBodySubtext;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxHoveredTextColor = semanticColors.bodyText;
  const checkboxBackgroundDisabledChecked = semanticColors.disabledBodySubtext;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  return {
    root: [
      'ms-Checkbox',
      {
        position: 'relative',
        display: 'flex'
      },
      reversed && 'reversed',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      className
    ],
    input: [
      {
        position: 'absolute',
        background: 'none',

        opacity: 0,
        selectors: {
          [`.${IsFocusVisibleClassName} &:focus + label`]: {
            outline: '1px solid ' + theme.palette.neutralSecondary,
            outlineOffset: '2px',
            selectors: {
              [HighContrastSelector]: {
                outline: '1px solid ActiveBorder'
              }
            }
          }
        }
      }
    ],
    label: [
      'ms-Checkbox-label',
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
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              borderColor: checkboxBorderHoveredColor,
              selectors: {
                [HighContrastSelector]: {
                  borderColor: 'Highlight'
                }
              }
            },
            ':focus .ms-Checkbox-checkbox': { borderColor: checkboxBorderHoveredColor },
            ':hover .ms-Checkbox-checkmark': {
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
        checked && {
          selectors: {
            ':hover .ms-Checkbox-checkbox': {
              background: checkboxBackgroundCheckedHovered,
              borderColor: checkboxBorderColorCheckedHovered
            },
            ':focus .ms-Checkbox-checkbox': {
              background: checkboxBackgroundCheckedHovered,
              borderColor: checkboxBorderColorCheckedHovered
            },
            [HighContrastSelector]: {
              selectors: {
                ':hover .ms-Checkbox-checkbox': {
                  background: 'Window',
                  borderColor: 'Highlight'
                },
                ':focus .ms-Checkbox-checkbox': {
                  background: 'Highlight'
                },
                ':focus:hover .ms-Checkbox-checkbox': {
                  background: 'Highlight'
                },
                ':focus:hover .ms-Checkbox-checkmark': {
                  color: 'Window'
                },
                ':hover .ms-Checkbox-checkmark': {
                  color: 'Highlight'
                }
              }
            }
          }
        },
        {
          selectors: {
            ':hover .ms-Checkbox-text': { color: checkboxHoveredTextColor },
            ':focus .ms-Checkbox-text': { color: checkboxHoveredTextColor }
          }
        }
      ]
    ],
    checkbox: [
      'ms-Checkbox-checkbox',
      {
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: MS_CHECKBOX_LABEL_SIZE,
        width: MS_CHECKBOX_LABEL_SIZE,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: checkboxBorderColor,
        boxSizing: 'border-box',
        transitionProperty: 'background, border, border-color',
        transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
        transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,

        /* in case the icon is bigger than the box */
        overflow: 'hidden'
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
      'ms-Checkbox-checkmark',
      {
        opacity: checked ? '1' : '0',
        color: checked && disabled ? checkmarkFontColorCheckedDisabled : checkmarkFontColor,
        selectors: {
          [HighContrastSelector]: {
            color: disabled ? 'InactiveBorder' : 'Window',
            MsHighContrastAdjust: 'none'
          }
        }
      }
    ],
    text: [
      'ms-Checkbox-text',
      {
        color: disabled ? checkboxTextColorDisabled : checkboxTextColor,
        fontSize: FontSizes.medium,
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
