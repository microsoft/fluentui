import { IOverlayStyleProps, IOverlayStyles } from './Overlay.types';
import {
  IStyle,
  ITheme,
  HighContrastSelector,
} from '../../Styling';

export const getStyles = (
  props: IOverlayStyleProps
): IOverlayStyles => {
  const {
    className,
    theme,
    isNone,
    isDarkThemed,
  } = props;

  const { palette, semanticColors } = theme;

  return ({
    root: [
      'ms-Overlay',
      {
        backgroundColor: palette.blackTranslucent40,
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

      isDarkThemed && [
        'ms-Overlay--dark',
        {
          backgroundColor: palette.blackTranslucent40,
        }
      ],

      className
    ],

    // Insert className styles
  });
};
