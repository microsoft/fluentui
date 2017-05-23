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
  let thumbOnColor = semanticColors.bodyBackground;
  let thumbOffDisabledColor = semanticColors.disabledText;
  let thumbOnDisabledColor = semanticColors.disabledBackground;

  let toggleBorderOffColor = semanticColors.inputBorder;
  let toggleBorderOffHoverColor = semanticColors.inputBorderHover;
  let toggleBorderOffDisabledColor = semanticColors.disabledText;

  let toggleFocusBorderColor = semanticColors.focusBorder;

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
