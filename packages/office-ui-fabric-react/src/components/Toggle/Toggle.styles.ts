import { IToggleStyles } from './Toggle.Props';
import {
  ITheme,
  getTheme,
  mergeStyles
} from '../../Styling';
import { memoize } from '../../Utilities';


export const getStyles = memoize((
  theme: ITheme = getTheme()): IToggleStyles => {

  /*root?: IStyle,

  toggle?: IStyle,
  toggleOn?: IStyle,
  toggleDisabled?: IStyle,

  thumb?: IStyle,
  thumbOn?: IStyle,
  thumbDisabled?: IStyle
  */

  let sc = theme.semanticColors;

  let toggleBackgroundOffColor = sc.bodyBackground;
  let toggleBackgroundOnColor = sc.inputBackgroundSelected;
  let toggleBackgroundOnHoverColor = sc.inputBackgroundSelectedHover;
  let toggleBackgroundOnDisabledColor = sc.disabledText;

  let thumbOffColor = sc.inputBorderHover;
  let thumbOnColor = sc.bodyBackground;
  let thumbOffDisabledColor = sc.disabledText;
  let thumbOnDisabledColor = sc.disabledBackground;

  let toggleBorderOffColor = sc.inputBorder;
  let toggleBorderOffHoverColor = sc.inputBorderHover;
  let toggleBorderOffDisabledColor = sc.disabledText;

  let toggleFocusBorderColor = sc.focusBorder;

  return {
    root: mergeStyles({
    }),

    toggle: mergeStyles({
      background: toggleBackgroundOffColor,
      border: '1px solid ' + toggleBorderOffColor
    }),
    toggleOn: mergeStyles({
      background: toggleBackgroundOnColor,
      borderColor: 'transparent'
    }),
    toggleDisabled: mergeStyles({
      borderColor: toggleBorderOffDisabledColor
    }),
    toggleOnDisabled: mergeStyles({
      backgroundColor: toggleBackgroundOnDisabledColor
    }),

    thumb: mergeStyles({
      background: thumbOffColor
    }),
    thumbOn: mergeStyles({
      background: thumbOnColor
    }),
    thumbDisabled: mergeStyles({
      background: thumbOffDisabledColor
    }),
    thumbOnDisabled: mergeStyles({
      background: thumbOnDisabledColor
    })
  };
});
