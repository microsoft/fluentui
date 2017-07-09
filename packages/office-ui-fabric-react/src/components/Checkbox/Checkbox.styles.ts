import { ICheckboxStyles } from './Checkbox.Props';
import {
  ITheme,
  mergeStyleSets,
  getFocusStyle
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: ICheckboxStyles
): ICheckboxStyles => {
  const { semanticColors } = theme;
  const checkmarkFontColor = semanticColors.bodyBackground;
  const checkboxBorderColor = semanticColors.inputBorder;
  const checkboxHoveredBorderColor = semanticColors.inputBorderHovered;
  const checkboxCheckedBackground = semanticColors.inputBackgroundChecked;
  const checkboxCheckedHoveredBackground = semanticColors.inputBackgroundCheckedHovered;
  const checkboxDisabledBackground = semanticColors.disabledText;
  const checkboxDisabledTextColor = semanticColors.disabledText;

  const styles: ICheckboxStyles = {
    root: {
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      margin: '0 -4px'
    },
    labelReversed: {
      flexDirection: 'row-reverse'
    },
    labelDisabled: {
      cursor: 'default'
    },
    input: {
      position: 'absolute',
      opacity: '0'
    },
    box: {
      display: 'flex',
      margin: '0 4px',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 ' + MS_CHECKBOX_LABEL_SIZE,
      height: MS_CHECKBOX_LABEL_SIZE
    },
    checkbox: {
      display: 'flex',
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

      /* incase the icon is bigger than the box */
      overflow: 'hidden'
    },
    checkboxHovered: {
      borderColor: checkboxHoveredBorderColor
    },
    checkboxChecked: {
      background: checkboxCheckedBackground,
      borderWidth: '0',
    },
    checkboxCheckedHovered: {
      background: checkboxCheckedHoveredBackground
    },
    checkboxDisabled: {
      background: checkboxDisabledBackground
    },
    checkboxCheckedDisabled: {
      background: checkboxDisabledBackground
    },
    checkmark: {
      opacity: '0',
      flex: '0 0 auto',
      color: checkmarkFontColor
    },
    checkmarkChecked: {
      opacity: '1'
    },
    text: {
      flex: '1 0 auto',
      margin: '0 4px'
    },
    textHovered: {

    },
    textDisabled: {
      color: checkboxDisabledTextColor   // ms-fontColor-neutralTertiary
    }
  };

  return mergeStyleSets(styles, customStyles);
});