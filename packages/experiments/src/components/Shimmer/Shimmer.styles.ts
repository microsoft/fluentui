import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { keyframes, DefaultPalette } from '../../Styling';
import { getRTL } from '../../Utilities';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    width,
    isDataLoaded,
    widthInPercentage,
    widthInPixel,
    className
  } = props;

  const isRTL = getRTL();

  const BACKGROUND_OFF_SCREEN_POSITION = '1000%';

  // TODO reduce the logic after the deprecated value will be removed.
  const ACTUAL_WIDTH =
    width ? width + '%' :
      widthInPercentage ? widthInPercentage + '%' :
        widthInPixel ? widthInPixel + 'px' : '100%';

  const shimmerAnimation: string = keyframes({
    '0%': {
      backgroundPosition: `-${BACKGROUND_OFF_SCREEN_POSITION}`
    },
    '100%': {
      backgroundPosition: BACKGROUND_OFF_SCREEN_POSITION
    }
  });

  const shimmerAnimationRTL: string = keyframes({
    '100%': {
      backgroundPosition: `-${BACKGROUND_OFF_SCREEN_POSITION}`
    },
    '0%': {
      backgroundPosition: BACKGROUND_OFF_SCREEN_POSITION
    }
  });

  return {
    root: [
      'ms-Shimmer-container',
      {
        position: 'relative',
      },
      className
    ],
    shimmerWrapper: [
      'ms-Shimmer-shimmerWrapper',
      {
        width: ACTUAL_WIDTH,
        background: `${DefaultPalette.neutralLighter}
                    linear-gradient(
                      to right,
                      ${DefaultPalette.neutralLighter} 0%,
                      ${DefaultPalette.neutralLight} 50%,
                      ${DefaultPalette.neutralLighter} 100%)
                    0 0 / 90% 100%
                    no-repeat`,
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: isRTL ? shimmerAnimationRTL : shimmerAnimation,
        transition: 'opacity 200ms, background 200ms'
      },
      isDataLoaded && {
        opacity: '0',
        background: 'none'
      }
    ],
    dataWrapper: [
      'ms-Shimmer-dataWrapper',
      {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        opacity: '0',
        lineHeight: '1',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        transition: 'opacity 200ms'
      },
      isDataLoaded && {
        opacity: '1'
      }
    ]
  };
}
