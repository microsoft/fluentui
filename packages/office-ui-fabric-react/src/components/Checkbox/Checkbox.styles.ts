import { ICheckboxStyles } from './Checkbox.Props';
import {
  ITheme,
  mergeStyleSets,
  getFocusStyleBasedOnAncestorClass
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

const MS_CHECKBOX_LABEL_SIZE = '20px';
const MS_CHECKBOX_TRANSITION_DURATION = '200ms';
const MS_CHECKBOX_TRANSITION_TIMING = 'cubic-bezier(.4, 0, .23, 1)';
const MS_CHECKBOX_HIGHCONTRAST_ICONBOXSIZE = '16px';

const MS_HIGHCONTRAST_ACTIVE = '@media screen and (-ms-high-contrast: active)';
const MS_HIGHCONTRAST_BLACK_ON_WHITE = '@media screen and (-ms-high-contrast: black-on-white)';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: ICheckboxStyles
): ICheckboxStyles => {
  const { semanticColors, palette } = theme;
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
    },
    label: [
      getFocusStyleBasedOnAncestorClass(theme, '.ms-Fabric.is-focusVisible .is-inFocus'),
      {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        margin: '0 -4px',
        userSelect: 'none'
      }
    ],
    labelReversed: {
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
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
      height: MS_CHECKBOX_LABEL_SIZE,
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
      background: 'none',
      transitionProperty: 'background, border, border-color',
      transitionDuration: MS_CHECKBOX_TRANSITION_DURATION,
      transitionTimingFunction: MS_CHECKBOX_TRANSITION_TIMING,

      /* incase the icon is bigger than the box */
      overflow: 'hidden',
    },
    checkboxHovered: {
      borderColor: checkboxHoveredBorderColor,
    },
    checkboxChecked: {
      background: checkboxCheckedBackground,
    },
    checkboxCheckedHovered: {
      background: checkboxCheckedHoveredBackground,
    },
    checkboxDisabled: {
      background: checkboxDisabledBackground,
      [MS_HIGHCONTRAST_ACTIVE]: {
        borderColor: palette.contrastBlackDisabled,
      },
      [MS_HIGHCONTRAST_BLACK_ON_WHITE]: {
        borderColor: palette.contrastWhiteDisabled,
      },
    },
    checkboxCheckedDisabled: {
      background: checkboxDisabledBackground,
    },
    checkmark: {
      opacity: '0',
      color: checkmarkFontColor
    },
    checkmarkChecked: {
      opacity: '1'
    },
    checkmarkDisabled: {
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: palette.contrastBlackDisabled,
      },
      [MS_HIGHCONTRAST_BLACK_ON_WHITE]: {
        color: palette.contrastWhiteDisabled,
      },
    },
    checkmarkCheckedDisabled: {
      opacity: '1',
    },
    text: {
      margin: '0 4px'
    },
    textHovered: {
      color: palette.black,
    },
    textDisabled: {
      color: checkboxDisabledTextColor,   // ms-fontColor-neutralTertiary
      [MS_HIGHCONTRAST_ACTIVE]: {
        color: palette.contrastBlackDisabled,
      },
      [MS_HIGHCONTRAST_BLACK_ON_WHITE]: {
        color: palette.contrastWhiteDisabled,
      },
    }
  };

  return mergeStyleSets(styles, customStyles);
});