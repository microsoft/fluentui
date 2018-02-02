import { ICheckStyleProps, ICheckStyles } from './Check.types';
import {
  concatStyleSets,
  setUserSelect,
  getTheme,
  ITheme,
  IStyle,
  HighContrastSelector
} from '@uifabric/styling';
import { memoizeFunction } from '@uifabric/utilities';

const DEFAULT_CHECKBOX_HEIGHT: string = '18px';

export const getStyles = (
  props: ICheckStyleProps
): ICheckStyles => {
  const {
    checkBoxHeight = DEFAULT_CHECKBOX_HEIGHT,
    theme = getTheme()
  } = props;
  const { palette, semanticColors } = theme;
  const _circle_check: IStyle = {
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
      setUserSelect('none'),
      {
        lineHeight: 1,
        width: checkBoxHeight,
        height: checkBoxHeight,
        verticalAlign: 'top',
        position: 'relative',

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

          rootIsChecked: {
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
          },
          check: {
            opacity: 0
          },
          checkHost: {
            selectors: {
              ':hover &': {
                opacity: 1
              },
              ':focus &': {
                opacity: 1
              },
              ':hover': {
                opacity: 1
              },
              ':focus': {
                opacity: 1
              },
              rootIsChecked: {
                selectors: {
                  check: {
                    opacity: 1
                  }
                }
              }
            }
          }
        }
      }
    ],

    circle: {
      ..._circle_check,
      color: palette.neutralTertiaryAlt,
      selectors: {
        [HighContrastSelector]: {
          color: 'WindowText'
        }
      }
    },

    check: {
      ..._circle_check,
      color: palette.neutralTertiaryAlt,
      fontSize: '16px',
      left: '.5px',

      selectors: {
        [HighContrastSelector]: {
          MsHighContrastAdjust: 'none'
        }
      }
    },

    rootIsChecked: {
      selectors: {
        circle: {
          color: palette.white
        },

        check: {
          color: palette.white,
          fontWeight: 900,

          selectors: {
            [HighContrastSelector]: {
              border: 'none',
              color: 'WindowText'
            }
          }
        }
      }
    },
  });
};
