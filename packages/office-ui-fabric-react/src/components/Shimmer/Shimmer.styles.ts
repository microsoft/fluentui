import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { keyframes, getGlobalClassNames, hiddenContentStyle, HighContrastSelector } from '../../Styling';
import { getRTL } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Shimmer-container',
  shimmerWrapper: 'ms-Shimmer-shimmerWrapper',
  dataWrapper: 'ms-Shimmer-dataWrapper'
};

const BACKGROUND_OFF_SCREEN_POSITION = '1000%';

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

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const { isDataLoaded, className, theme, transitionAnimationInterval, shimmerColor, shimmerWaveColor } = props;

  const { palette } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const isRTL = getRTL();

  return {
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        position: 'relative',
        height: 'auto'
      },
      className
    ],
    shimmerWrapper: [
      classNames.shimmerWrapper,
      {
        background: `${shimmerColor || palette.neutralLighter}
                    linear-gradient(
                      to right,
                      ${shimmerColor || palette.neutralLighter} 0%,
                      ${shimmerWaveColor || palette.neutralLight} 50%,
                      ${shimmerColor || palette.neutralLighter} 100%)
                    0 0 / 90% 100%
                    no-repeat`,
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: isRTL ? shimmerAnimationRTL : shimmerAnimation,
        transition: `opacity ${transitionAnimationInterval}ms`,
        selectors: {
          [HighContrastSelector]: {
            background: `WindowText
                        linear-gradient(
                          to right,
                          transparent 0%,
                          Window 50%,
                          transparent 100%)
                        0 0 / 90% 100%
                        no-repeat`
          }
        }
      },
      isDataLoaded && {
        opacity: '0',
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0'
      }
    ],
    dataWrapper: [
      classNames.dataWrapper,
      {
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        opacity: '0',
        background: 'none',
        backgroundColor: 'transparent',
        border: 'none',
        transition: `opacity ${transitionAnimationInterval}ms`
      },
      isDataLoaded && {
        opacity: '1',
        position: 'static'
      }
    ],
    screenReaderText: hiddenContentStyle
  };
}
