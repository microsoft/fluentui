import { ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import {
  ITheme,
  concatStyleSets,
  getFocusStyle,
  FontSizes,
  HighContrastSelector
} from '../../Styling';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = (props: ICheckboxStyleProps): ICheckboxStyles => {
  const { className, theme, reversed, checked, disabled } = props;
  const { semanticColors, palette } = theme;
  const checkmarkFontColor = semanticColors.inputForegroundChecked;
  const checkmarkFontColorHovered = semanticColors.inputBorder;
  const checkmarkFontColorCheckedDisabled = semanticColors.disabledBackground;
  const checkboxBorderColor = semanticColors.inputBorder;
  const checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorDisabled = semanticColors.disabledText;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBackgroundDisabled = semanticColors.disabledText;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  return ({
    root: [
      'ms-Checkbox',
      reversed && 'reversed',
      checked && 'is-checked',
      !disabled && 'is-enabled',
      disabled && 'is-disabled',
      getFocusStyle(theme, -3),
      {
        padding: '0',
        border: 'none',
        background: 'none',
        margin: '0',
        outline: 'none',
        display: 'block',
        cursor: 'pointer',

        selectors: {
          '&:hover $text, &:focus $text': { color: palette.black }
        }
      },
      !disabled && [
        !checked && {
          selectors: {
            '&:hover $checkbox, &:focus $checkbox': { borderColor: checkboxBorderHoveredColor },
            '&:hover $checkmark': { color: checkmarkFontColorHovered, opacity: '1' },
          }
        },
        checked && {
          selectors: {
            '&:hover $checkbox, &:focus $checkbox': {
              background: checkboxBackgroundCheckedHovered,
              borderColor: checkboxBorderColorCheckedHovered,
            },
            [HighContrastSelector]: {
              selectors: {
                '&:hover $checkbox, &:focus $checkbox': {
                  background: 'WindowText',
                  borderColor: 'WindowText'
                }
              }
            }
          }
        }
      ],
      className,
    ],
    label: [
      'ms-Checkbox-label',
      {
        display: 'inline-flex',
        margin: '0 -4px',
        alignItems: 'center',
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

        /* incase the icon is bigger than the box */
        overflow: 'hidden'
      },
      !disabled && checked && {
        background: checkboxBackgroundChecked,
        borderColor: checkboxBorderColorChecked,

        selectors: {
          [HighContrastSelector]: {
            background: 'WindowText',
            borderColor: 'WindowText',
          }
        }
      },
      disabled && {
        background: checkboxBackgroundDisabled,
        borderColor: checkboxBorderColorDisabled
      },
      checked && disabled && {
        background: checkboxBackgroundDisabled,
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
            MsHighContrastAdjust: 'none',
          }
        }
      }
    ],

    text: [
      'ms-Checkbox-text',
      {
        color: disabled ? checkboxTextColorDisabled : checkboxTextColor,
        margin: '0 4px',
        fontSize: FontSizes.medium
      }
    ]
  });
};
