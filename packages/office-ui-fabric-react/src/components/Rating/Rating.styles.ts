import {
  getFocusStyle,
  hiddenContentStyle,
  HighContrastSelector,
} from '../../Styling';
import { RatingSize, IRatingStyleProps, IRatingStyles } from './Rating.types';

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
      'ms-RatingStar-container',
      {
        display: 'inline-block',
        position: 'relative'
      }
    ],
    ratingStarBack: [
      'ms-RatingStar-back',
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
      'ms-RatingStar-front',
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
      'ms-Rating-button',
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
      'ms-Rating--small',
      {
        fontSize: ratingSmallIconSize,
        lineHeight: ratingSmallIconSize
      }
    ],
    rootIsLarge: [
      'ms-Rating--large',
      {
        fontSize: ratingLargeIconSize,
        lineHeight: ratingLargeIconSize
      }
    ],
    labelText: [
      'ms-Rating-labelText',
      hiddenContentStyle
    ],
    ratingFocusZone: [
      'ms-Rating-focuszone',
      {
        display: 'inline-block',
        paddingBottom: '1px'
      }
    ]
  };
}
