import { IToggleStyles } from './Toggle.Props';
import {
  ITheme,
  getTheme,
  mergeStyles
} from '../../Styling';
import { memoize } from '../../Utilities';


export const getStyles = memoize((
  theme: ITheme = getTheme()): IToggleStyles => {

  let { semanticColors } = theme;

  let toggleBackgroundOffColor = semanticColors.bodyBackground;
  let toggleBackgroundOnColor = semanticColors.inputBackgroundSelected;
  let toggleBackgroundOnHoveredColor = semanticColors.inputBackgroundSelectedHovered;
  let toggleBackgroundOnDisabledColor = semanticColors.disabledText;

  let thumbOffColor = semanticColors.inputBorderHovered;
  let thumbOnColor = semanticColors.inputForegroundSelected;
  let thumbOffDisabledColor = semanticColors.disabledText;
  let thumbOnDisabledColor = semanticColors.disabledBackground;

  let toggleBorderOffColor = semanticColors.inputBorder;
  let toggleBorderOffHoveredColor = semanticColors.inputBorderHovered;
  let toggleBorderOffDisabledColor = semanticColors.disabledText;

  let toggleFocusBorderColor = semanticColors.focusBorder;

  return {
    root: {
      marginBottom: '8px'
    },

    control: {
      display: 'inline-flex',
      position: 'relative',
    },
    invisibleToggle: {
      opacity: '0',
      cursor: 'pointer',
      margin: '0',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      width: '100%',
      ':disabled': {
        cursor: 'default'
      }
    },
    stateText: {
      '.ms-Toggle-stateText': { // increase specificity, todo: cleanup
        padding: '0', // overwrite default Label padding
        margin: '0 10px'
      }
    },
    focus: {
      outline: '1px solid ' + toggleFocusBorderColor
    },

    toggle: {
      fontSize: '20px',
      lineHeight: '1em',
      boxSizing: 'border-box',
      position: 'relative',
      width: '2.2em',
      height: '1em',
      borderRadius: '1em',
      transition: 'all 0.1s ease',
      pointerEvents: 'none',
      borderWidth: '1px',
      borderStyle: 'solid'
    },
    toggleDefault: {
      background: toggleBackgroundOffColor,
      borderColor: toggleBorderOffColor,
    },
    toggleHovered: {
      borderColor: toggleBorderOffHoveredColor
    },
    toggleOn: {
      background: toggleBackgroundOnColor,
      borderColor: 'transparent',
    },
    toggleOnHovered: {
      backgroundColor: toggleBackgroundOnHoveredColor,
      borderColor: 'transparent'
    },
    toggleDisabled: {
      borderColor: toggleBorderOffDisabledColor
    },
    toggleOnDisabled: {
      backgroundColor: toggleBackgroundOnDisabledColor,
      borderColor: 'transparent'
    },

    thumb: {
      width: '.5em',
      height: '.5em',
      borderRadius: '.5em',
      position: 'absolute',
      top: '.2em',
      transition: 'all 0.1s ease'
    },
    thumbDefault: {
      backgroundColor: thumbOffColor,
      left: '.2em',
    },
    thumbHovered: {
      // unstyled
    },
    thumbOn: {
      backgroundColor: thumbOnColor,
      left: '1.4em'
    },
    thumbOnHovered: {
      // unstyled
    },
    thumbDisabled: {
      backgroundColor: thumbOffDisabledColor,
      left: '.2em',
    },
    thumbOnDisabled: {
      backgroundColor: thumbOnDisabledColor,
      left: '1.4em'
    }
  };
});
