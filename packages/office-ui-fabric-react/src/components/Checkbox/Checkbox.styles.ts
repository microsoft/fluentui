import { ICheckboxStyles, ICheckboxStyleProps } from './Checkbox.types';
import {
  IStyle,
  ITheme,
  concatStyleSets,
  getFocusStyle,
  FontSizes
} from '../../Styling';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = (
  props: ICheckboxStyleProps
): ICheckboxStyles => {
  const {
    customStyles,
    className,
    theme,
    disabled,
    isChecked,
    isReversed
  } = props;

  const { semanticColors, palette } = theme;

  const checkmarkFontColor = semanticColors.inputForegroundChecked;
  const checkmarkFontColorCheckedDisabled = semanticColors.disabledBackground;
  const checkboxBorderColor = semanticColors.smallInputBorder;
  const checkboxBorderColorChecked = semanticColors.inputBackgroundChecked;
  const checkboxBorderColorDisabled = semanticColors.disabledBodyText;
  const checkboxBorderHoveredColor = semanticColors.inputBorderHovered;
  const checkboxBackgroundChecked = semanticColors.inputBackgroundChecked;
  const checkboxBackgroundCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBorderColorCheckedHovered = semanticColors.inputBackgroundCheckedHovered;
  const checkboxBackgroundDisabled = semanticColors.disabledBodyText;
  const checkboxTextColor = semanticColors.bodyText;
  const checkboxTextColorDisabled = semanticColors.disabledText;

  const styles: ICheckboxStyles = {
    root: [
      'ms-Checkbox',
      getFocusStyle(theme, -2),
      {
        padding: '0',
        border: 'none',
        background: 'none',
        margin: '0',
        outline: 'none',
        display: 'block',
        cursor: 'pointer',
      },
      isReversed && [
        'reversed'
      ],
      isChecked && [
        'is-checked'
      ],
      !disabled && [
        'is-enabled',
        !isChecked && {
          selectors: {
            '&:hover .ms-Checkbox-checkbox, &:focus .ms-Checkbox-checkbox': {
              borderColor: checkboxBorderHoveredColor
            },
          }
        }
      ],
      disabled && [
        'is-disabled'
      ],
      className
    ],

    label: [
      'ms-Checkbox-label',
      {
        display: 'inline-flex',
        margin: '0 -4px',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        userSelect: 'none',
        textAlign: 'left'
      },
      isReversed && {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
      },
      !!disabled && {
        cursor: 'default'
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

        // incase the icon is bigger than the box
        overflow: 'hidden',

        selectors: {
          '&:hover, &:focus': {
            borderColor: checkboxBorderHoveredColor
          }
        }
      },
      !disabled && isChecked && {
        background: checkboxBackgroundChecked,
        borderColor: checkboxBorderColorChecked,

        selectors: {
          '&:hover, &:focus': {
            background: checkboxBackgroundCheckedHovered,
            borderColor: checkboxBorderColorCheckedHovered
          }
        }
      },
      disabled && !isChecked && {
        borderColor: checkboxBorderColorDisabled
      },
      disabled && isChecked && {
        background: checkboxBackgroundDisabled,
        borderColor: checkboxBorderColorDisabled
      }
    ],

    checkmark: [
      'ms-Checkbox-checkmark',
      {
        opacity: '0',
        color: checkmarkFontColor
      },
      !disabled && isChecked && {
        opacity: '1'
      },
      disabled && !isChecked && {
      },
      disabled && isChecked && {
        opacity: '1',
        color: checkmarkFontColorCheckedDisabled,
      }
    ],

    text: [
      'ms-Checkbox-text',
      {
        color: checkboxTextColor,
        margin: '0 4px',
        fontSize: FontSizes.medium,

        selectors: {
          '&:hover, &:focus': {
            color: palette.black
          }
        }
      },
      disabled && {
        color: checkboxTextColorDisabled,
        // ms-fontColor-neutralTertiary
      }
    ],
    // checkboxHovered: {
    //   borderColor: checkboxBorderHoveredColor,
    // },
    // checkboxFocused: {
    //   borderColor: checkboxBorderHoveredColor,
    // },
    // checkboxChecked: {
    //   background: checkboxBackgroundChecked,
    //   borderColor: checkboxBorderColorChecked
    // },
    // checkboxCheckedHovered: {
    //   background: checkboxBackgroundCheckedHovered,
    //   borderColor: checkboxBorderColorCheckedHovered
    // },
    // checkboxCheckedFocused: {
    //   background: checkboxBackgroundCheckedHovered,
    //   borderColor: checkboxBorderColorCheckedHovered
    // },
    // checkboxDisabled: {
    //   borderColor: checkboxBorderColorDisabled
    // },
    // checkboxCheckedDisabled: {
    //   background: checkboxBackgroundDisabled,
    //   borderColor: checkboxBorderColorDisabled
    // },
    // checkmarkChecked: {
    //   opacity: '1'
    // },
    // checkmarkDisabled: {
    // },
    // checkmarkCheckedDisabled: {
    //   opacity: '1',
    //   color: checkmarkFontColorCheckedDisabled,
    // },
    // textHovered: {
    //   color: palette.black,
    // },
    // textFocused: {
    //   color: palette.black,
    // },
    // textDisabled: {
    //   color: checkboxTextColorDisabled,   // ms-fontColor-neutralTertiary
    // }
  };

  return concatStyleSets(styles, customStyles)!;
};