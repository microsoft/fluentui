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
  let toggleBackgroundOnHoverColor = semanticColors.inputBackgroundSelectedHover;
  let toggleBackgroundOnDisabledColor = semanticColors.disabledText;

  let thumbOffColor = semanticColors.inputBorderHover;
  let thumbOnColor = semanticColors.inputForegroundSelected;
  let thumbOffDisabledColor = semanticColors.disabledText;
  let thumbOnDisabledColor = semanticColors.disabledBackground;

  let toggleBorderOffColor = semanticColors.inputBorder;
  let toggleBorderOffHoverColor = semanticColors.inputBorderHover;
  let toggleBorderOffDisabledColor = semanticColors.disabledText;

  let toggleFocusBorderColor = semanticColors.focusBorder;

  return {
    root: mergeStyles({
      marginBottom: '8px'
    }),

    control: mergeStyles({
      display: 'inline-flex',
      position: 'relative',
    }),
    invisibleToggle: mergeStyles({
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
      },
      ':focus + .ms-Toggle-background': {
        // todo
      }
    }),
    stateText: mergeStyles({
      '.ms-Toggle-stateText': { // increase specificity, todo: cleanup
        padding: '0', // overwrite default Label padding
        margin: '0 10px'
      }
    }),
    focus: mergeStyles({
      outline: '1px solid ' + toggleFocusBorderColor
    }),

    toggleBase: mergeStyles({
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
    }),
    toggle: mergeStyles({
      background: toggleBackgroundOffColor,
      borderColor: toggleBorderOffColor,
    }),
    toggleHover: mergeStyles({
      borderColor: toggleBorderOffHoverColor
    }),
    toggleOn: mergeStyles({
      background: toggleBackgroundOnColor,
      borderColor: 'transparent',
    }),
    toggleOnHover: mergeStyles({
      backgroundColor: toggleBackgroundOnHoverColor,
      borderColor: 'transparent'
    }),
    toggleDisabled: mergeStyles({
      borderColor: toggleBorderOffDisabledColor
    }),
    toggleOnDisabled: mergeStyles({
      backgroundColor: toggleBackgroundOnDisabledColor,
      borderColor: 'transparent'
    }),

    thumbBase: mergeStyles({
      width: '.5em',
      height: '.5em',
      borderRadius: '.5em',
      position: 'absolute',
      top: '.2em',
      transition: 'all 0.1s ease'
    }),
    thumb: mergeStyles({
      backgroundColor: thumbOffColor,
      left: '.2em',
    }),
    thumbHover: mergeStyles({
      // unstyled
    }),
    thumbOn: mergeStyles({
      backgroundColor: thumbOnColor,
      left: '1.4em'
    }),
    thumbOnHover: mergeStyles({
      // unstyled
    }),
    thumbDisabled: mergeStyles({
      backgroundColor: thumbOffDisabledColor,
      left: '.2em',
    }),
    thumbOnDisabled: mergeStyles({
      backgroundColor: thumbOnDisabledColor,
      left: '1.4em'
    })
  };
});
