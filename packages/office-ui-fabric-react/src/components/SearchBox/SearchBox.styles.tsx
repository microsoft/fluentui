import {
  FontSizes,
  HighContrastSelector,
  ScreenWidthMaxMedium,
  ScreenWidthMaxSmall,
  AnimationStyles
} from '../../Styling';
import { SearchBoxBase } from './SearchBox.base';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';


export function getStyles(props: ISearchBoxStyleProps): ISearchBoxStyles {
  const { theme, underlined, disabled, hasFocus } = props;
  const { palette, fonts } = theme;

  return {
    root: [
      'ms-Searchbox',
      fonts.medium,
      {
        //@include ms-normalize;
        color: palette.neutralPrimary,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
        padding: '0 0 0 8px',
        border: `1px solid &{palette.neutralTertiary}`,
        height: '32px',
        selectors: {
          [HighContrastSelector]: {
            border: '1px solid WindowText'
          }
        }
      },
      hasFocus && {
        borderColor: palette.themePrimary,
        selectors: {
          ':hover': {
            borderColor: palette.themePrimary,
          },
          [HighContrastSelector]: {
            borderColor: 'Highlight'
          }
        }
      },
      disabled && {

      }
    ],
    iconContainer: [
      'ms-Searchbox-iconContainer',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        fontSize: 16,
        width: 32,
        textAlign: 'center',
        transition: 'width $ms-animation-duration-1',
        color: palette.themePrimary
      },
      hasFocus && {
        width: '4px',
        transition: 'width  $ms-animation-duration-1'
      }
    ]
  }
}