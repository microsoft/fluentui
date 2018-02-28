import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    isGeneric,
    hasCircle
  } = props;

  // const ShimmerSmallIconSize = '16px';
  // const ratingLargeIconSize = '20px';

  return {
    root: [
      'ms-Shimmer-container',
      {
        display: 'inline-block',
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(to right, white 0%, black 50%, white 100%)',
        backgroundColor: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'content-box',
      }
    ],
    circle: [
      'ms-Shimmer-circle',
      {
        width: '36px',
        height: '24px'
      },
    ],
    line: [
      'ms-Shimmer-line',
      {
        color: 'transparent',
        width: '100%',
        height: '16px'
      },
      hasCircle && {
        height: '24px',
        borderBottom: '4px solid white',
        borderBottomWidth: '4px',
        borderBottomStyle: 'style',
        borderBottomColor: 'white'
      }
    ]

    // ratingStar: [
    //   'ms-RatingStar-container',
    //   {
    //     display: 'inline-block',
    //     position: 'relative'
    //   }
    // ],
    // ratingStarBack: [
    //   'ms-RatingStar-back',
    //   {
    //     // TODO: Use a proper semantic color for this
    //     color: palette.neutralTertiary,
    //     width: '100%'
    //   },
    //   disabled && {
    //     color: semanticColors.disabledBodyText,
    //     selectors: {
    //       [HighContrastSelector]: {
    //         color: 'GrayText'
    //       }
    //     }
    //   }
    // ],
    // ratingStarFront: [
    //   'ms-RatingStar-front',
    //   {
    //     position: 'absolute',
    //     height: '100 %',
    //     left: '0',
    //     top: '0',
    //     textAlign: 'center',
    //     verticalAlign: 'middle',
    //     overflow: 'hidden',
    //     color: semanticColors.bodyTextChecked,
    //     selectors: {
    //       [HighContrastSelector]: {
    //         'color': 'Highlight'
    //       }
    //     }
    //   }
    // ],
    // ratingButton: [
    //   getFocusStyle(theme, 0),
    //   'ms-Rating-button',
    //   {
    //     background: 'none',
    //     margin: '3px 3px 0px 0px',
    //     padding: '0px',
    //     border: 'none',
    //     cursor: 'pointer',
    //     selectors: {
    //       '&:disabled': {
    //         cursor: 'default'
    //       },
    //       '&[disabled]': {
    //         cursor: 'default'
    //       }
    //     }
    //   },
    //   disabled && {
    //     cursor: 'default'
    //   },
    // ],
    // rootIsSmall: [
    //   'ms-Rating--small',
    //   {
    //     fontSize: ratingSmallIconSize,
    //     lineHeight: ratingSmallIconSize
    //   }
    // ],
    // rootIsLarge: [
    //   'ms-Rating--large',
    //   {
    //     fontSize: ratingLargeIconSize,
    //     lineHeight: ratingLargeIconSize
    //   }
    // ],
    // labelText: [
    //   'ms-Rating-labelText',
    //   hiddenContentStyle
    // ],
    // ratingFocusZone: [
    //   'ms-Rating-focuszone',
    //   {
    //     display: 'inline-block',
    //     paddingBottom: '1px'
    //   }
    // ]
  };
}
