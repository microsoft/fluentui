import {
  getFocusStyle,
  hiddenContentStyle,
  HighContrastSelector,
  globalClassNamesWhenEnabled,
} from '../../Styling';
import { IRatingStyleProps, IRatingStyles } from './Rating.types';

export function getStyles(props: IRatingStyleProps): IRatingStyles {
  const {
    disabled,
    theme
  } = props;

  const {
    semanticColors,
    palette
  } = theme;

  const ratingSmallIconSize = '16px';
  const ratingLargeIconSize = '20px';

  return {
    ratingStar: [
      globalClassNamesWhenEnabled(theme, ['ms-RatingStar-container']),
      {
        display: 'inline-block',
        position: 'relative'
      }
    ],
    ratingStarBack: [
      globalClassNamesWhenEnabled(theme, ['ms-RatingStar-back']),
      {
        // TODO: Use a proper semantic color for this
        color: palette.neutralTertiary,
        width: '100%'
      },
      disabled && {
        color: semanticColors.disabledBodyText,
        selectors: {
          [HighContrastSelector]: {
            color: 'GrayText'
          }
        }
      }
    ],
    ratingStarFront: [
      globalClassNamesWhenEnabled(theme, ['ms-RatingStar-front']),
      {
        position: 'absolute',
        height: '100 %',
        left: '0',
        top: '0',
        textAlign: 'center',
        verticalAlign: 'middle',
        overflow: 'hidden',
        color: semanticColors.bodyTextChecked,
        selectors: {
          [HighContrastSelector]: {
            'color': 'Highlight'
          }
        }
      }
    ],
    ratingButton: [
      getFocusStyle(theme, 0),
      globalClassNamesWhenEnabled(theme, ['ms-Rating-button']),
      {
        background: 'none',
        margin: '3px 3px 0px 0px',
        padding: '0px',
        border: 'none',
        cursor: 'pointer',
        selectors: {
          '&:disabled': {
            cursor: 'default'
          },
          '&[disabled]': {
            cursor: 'default'
          }
        }
      },
      disabled && {
        cursor: 'default'
      },
    ],
    rootIsSmall: [
      globalClassNamesWhenEnabled(theme, ['ms-Rating--small']),
      {
        fontSize: ratingSmallIconSize,
        lineHeight: ratingSmallIconSize
      }
    ],
    rootIsLarge: [
      globalClassNamesWhenEnabled(theme, ['ms-Rating--large']),
      {
        fontSize: ratingLargeIconSize,
        lineHeight: ratingLargeIconSize
      }
    ],
    labelText: [
      globalClassNamesWhenEnabled(theme, ['ms-Rating-labelText']),
      hiddenContentStyle
    ],
    ratingFocusZone: [
      globalClassNamesWhenEnabled(theme, ['ms-Rating-focuszone']),
      {
        display: 'inline-block',
        paddingBottom: '1px'
      }
    ]
  };
}
