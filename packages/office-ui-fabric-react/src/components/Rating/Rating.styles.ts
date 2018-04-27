import {
  getFocusStyle,
  hiddenContentStyle,
  HighContrastSelector,
  getGlobalClassNames,
} from '../../Styling';
import { IRatingStyleProps, IRatingStyles } from './Rating.types';

const GlobalClassNames = {
  ratingStar: 'ms-RatingStar-container',
  ratingStarBack: 'ms-RatingStar-back',
  ratingStarFront: 'ms-RatingStar-front',
  ratingButton: 'ms-Rating-button',
  rootIsSmall: 'ms-Rating--small',
  rootIsLarge: 'ms-Rating--large',
  labelText: 'ms-Rating-labelText',
  ratingFocusZone: 'ms-Rating-focuszone',
};

export function getStyles(props: IRatingStyleProps): IRatingStyles {
  const {
    disabled,
    theme
  } = props;

  const {
    semanticColors,
    palette
  } = theme;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const ratingSmallIconSize = '16px';
  const ratingLargeIconSize = '20px';

  return {
    ratingStar: [
      classNames.ratingStar,
      {
        display: 'inline-block',
        position: 'relative'
      }
    ],
    ratingStarBack: [
      classNames.ratingStarBack,
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
      classNames.ratingStarFront,
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
      classNames.ratingButton,
      {
        background: 'none',
        backgroundColor: 'transparent',
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
      classNames.rootIsSmall,
      {
        fontSize: ratingSmallIconSize,
        lineHeight: ratingSmallIconSize
      }
    ],
    rootIsLarge: [
      classNames.rootIsLarge,
      {
        fontSize: ratingLargeIconSize,
        lineHeight: ratingLargeIconSize
      }
    ],
    labelText: [
      classNames.labelText,
      hiddenContentStyle
    ],
    ratingFocusZone: [
      classNames.ratingFocusZone,
      {
        display: 'inline-block',
        paddingBottom: '1px'
      }
    ]
  };
}
