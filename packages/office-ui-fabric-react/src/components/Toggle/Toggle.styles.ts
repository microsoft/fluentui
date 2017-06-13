import { IToggleStyles } from './Toggle.Props';
import {
  ITheme,
  mergeStyleSets,
  getFocusStyle
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';

export const getStyles = memoizeFunction((
  theme: ITheme,
  customStyles?: IToggleStyles
): IToggleStyles => {
  const { semanticColors } = theme;
  const pillUncheckedBackground = semanticColors.bodyBackground;
  const pillCheckedBackground = semanticColors.inputBackgroundChecked;
  const pillCheckedHoveredBackground = semanticColors.inputBackgroundCheckedHovered;
  const pillCheckedDisabledBackground = semanticColors.disabledText;
  const thumbBackground = semanticColors.inputBorderHovered;
  const thumbCheckedBackground = semanticColors.inputForegroundChecked;
  const thumbDisabledBackground = semanticColors.disabledText;
  const thumbCheckedDisabledBackground = semanticColors.disabledBackground;
  const pillBorderColor = semanticColors.inputBorder;
  const pillBorderHoveredColor = semanticColors.inputBorderHovered;
  const pillBorderDisabledColor = semanticColors.disabledText;
  const toggleFocusBorderColor = semanticColors.focusBorder;

  const styles: IToggleStyles = {
    root: {
      marginBottom: '8px'
    },

    container: [
      {
        display: 'inline-flex',
        position: 'relative',
      }
    ],

    pill: [
      getFocusStyle(theme, '-1px'),
      {
        fontSize: '20px',
        lineHeight: '1em',
        boxSizing: 'border-box',
        position: 'relative',
        width: '2.2em',
        height: '1em',
        borderRadius: '1em',
        transition: 'all 0.1s ease',
        borderWidth: '1px',
        borderStyle: 'solid',
        background: pillUncheckedBackground,
        borderColor: pillBorderColor,
        cursor: 'pointer',
      }
    ],

    pillHovered: {
      borderColor: pillBorderHoveredColor
    },

    pillChecked: {
      background: pillCheckedBackground,
      borderColor: 'transparent',
    },

    pillCheckedHovered: {
      backgroundColor: pillCheckedHoveredBackground,
      borderColor: 'transparent'
    },

    pillDisabled: {
      borderColor: pillBorderDisabledColor
    },

    pillCheckedDisabled: {
      backgroundColor: pillCheckedDisabledBackground,
      borderColor: 'transparent'
    },

    thumb: {
      borderRadius: '.5em',
      position: 'absolute',
      top: '.2em',
      transition: 'all 0.1s ease',
      borderColor: thumbBackground,
      borderWidth: '.28em',
      borderStyle: 'solid',
      left: '.2em'
    },

    thumbChecked: {
      borderColor: thumbCheckedBackground,
      borderWidth: '.28em',
      borderStyle: 'solid',
      left: '1.4em'
    },

    thumbDisabled: {
      borderColor: thumbDisabledBackground,
      borderWidth: '.28em',
      borderStyle: 'solid',
      left: '.2em',
    },

    thumbCheckedDisabled: {
      borderColor: thumbCheckedDisabledBackground,
      borderWidth: '.28em',
      borderStyle: 'solid',
      left: '1.4em'
    },

    text: {
      // Workaround; until Label is converted and we can pass in custom styles, we need to make this
      // more specific. Once Label is converted, we should be able to just pull in the customized styling.
      '.ms-Toggle-stateText': {
        padding: '0',
        margin: '0 10px',
        userSelect: 'none'
      }
    }

  };

  return mergeStyleSets(styles, customStyles);
});
