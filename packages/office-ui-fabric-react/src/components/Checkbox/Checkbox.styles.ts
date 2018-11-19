import { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { getFocusStyle, FontSizes, HighContrastSelector } from '../../Styling';

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
  const checkboxBorderColorDisabled = semanticColors.disabledBodyText;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxHoveredTextColor = semanticColors.bodyText;
  const checkboxBackgroundDisabledChecked = semanticColors.disabledBodyText;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  return {
    root: [
      'ms-Checkbox',
      reversed && 'reversed',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      getFocusStyle(theme, -3),
      theme.fonts.medium,
      {
        padding: '0',
        border: 'none',
        background: 'none',
        margin: '0',
        outline: 'none',
        display: 'block',
        cursor: 'pointer'
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
      ],
      className
    ],
    label: [
      'ms-Checkbox-label',
      {
        display: 'flex',
        margin: '0 -4px',
        alignItems: isUsingCustomLabelRender ? 'center' : 'flex-start',
        cursor: disabled ? 'default' : 'pointer',
        position: 'relative',
        userSelect: 'none',
        textAlign: 'left'
      },
      reversed && {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
      }
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
        margin: '0 4px',
        boxSizing: 'border-box',
        transitionProperty: 'background, border, border-color',
        transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
        transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,

        /* in case the icon is bigger than the box */
        overflow: 'hidden'
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
        borderColor: checkboxBorderColorDisabled
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
        margin: '0 4px',
        fontSize: FontSizes.medium,
        lineHeight: '20px'
      }
    ]
  };
};
