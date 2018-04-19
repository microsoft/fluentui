import { IOverlayStyleProps, IOverlayStyles } from './Overlay.types';
import { HighContrastSelector, globalClassNamesWhenEnabled } from '../../Styling';

export const getStyles = (
  props: IOverlayStyleProps
): IOverlayStyles => {
  const {
    className,
    theme,
    isNone,
    isDark,
  } = props;

  const { palette } = theme;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-Overlay']),
      {
        backgroundColor: palette.whiteTranslucent40,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',

        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText',
          }
        }
      },

      isNone && {
        visibility: 'hidden',
      },

      isDark && [
        globalClassNamesWhenEnabled(theme, ['ms-Overlay--dark']),
        {
          backgroundColor: palette.blackTranslucent40,
        }
      ],

      className
    ],
  });
};
