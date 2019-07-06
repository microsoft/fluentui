import { IOverlayStyleProps, IOverlayStyles } from './Overlay.types';
import { HighContrastSelector, getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-Overlay',
  rootDark: 'ms-Overlay--dark'
};

export const getStyles = (props: IOverlayStyleProps): IOverlayStyles => {
  const { className, theme, isNone, isDark } = props;

  const { palette } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
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
            opacity: 0
          }
        }
      },

      isNone && {
        visibility: 'hidden'
      },

      isDark && [
        classNames.rootDark,
        {
          backgroundColor: palette.blackTranslucent40
        }
      ],

      className
    ]
  };
};
