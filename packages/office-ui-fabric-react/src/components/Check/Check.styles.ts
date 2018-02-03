import { ICheckStyleProps, ICheckStyles } from './Check.types';
import {
  concatStyleSets,
  getTheme,
  HighContrastSelector,
  IStyle,
  ITheme,
} from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';

const DEFAULT_CHECKBOX_HEIGHT: string = '18px';

export const getStyles = (
  props: ICheckStyleProps
): ICheckStyles => {
  const {
    checkBoxHeight = DEFAULT_CHECKBOX_HEIGHT,
    theme,
    checked
  } = props;

  const { palette, semanticColors } = theme;

  const _sharedCircleCheck: IStyle = {
    fontSize: checkBoxHeight,
    position: 'absolute',
    left: 0,
    top: 0,
    width: checkBoxHeight,
    height: checkBoxHeight,
    textAlign: 'center',
    verticalAlign: 'middle'
  };

  return ({
    root: [
      {
        lineHeight: 1,
        width: checkBoxHeight,
        height: checkBoxHeight,
        verticalAlign: 'top',
        position: 'relative',
        userSelect: 'none',

        selectors: {
          ':before': {
            content: '""',
            position: 'absolute',
            top: '1px',
            right: '1px',
            bottom: '1px',
            left: '1px',
            borderRadius: '50%',
            opacity: 1,
            background: semanticColors.bodyBackground,
          },

          /**
           * TODO: Come back to this once .checkHost has been
           * converted to mergeStyles
           */
          '.checkHost:hover &, .checkHost:focus &, &:hover, &:focus': {
            opacity: 1
          }
        }
      },

      checked && {
        selectors: {
          ':before': {
            background: palette.themePrimary,
            opacity: 1,
            selectors: {
              [HighContrastSelector]: {
                background: 'Window'
              }
            }
          }
        }
      }
    ],

    circle: [
      _sharedCircleCheck,

      {
        color: palette.neutralTertiaryAlt,

        selectors: {
          [HighContrastSelector]: {
            color: 'WindowText'
          }
        }
      },

      checked && {
        color: palette.white
      }
    ],

    check: [
      _sharedCircleCheck,

      {
        opacity: 0,
        color: palette.neutralTertiaryAlt,
        fontSize: '16px',
        left: '.5px',

        selectors: {
          [HighContrastSelector]: {
            MsHighContrastAdjust: 'none'
          }
        }
      },

      checked && {
        opacity: 1,
        color: palette.white,
        fontWeight: 900,

        selectors: {
          [HighContrastSelector]: {
            border: 'none',
            color: 'WindowText'
          }
        }
      }
    ]
  });
};
