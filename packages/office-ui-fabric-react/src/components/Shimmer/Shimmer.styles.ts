import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { keyframes, getGlobalClassNames, hiddenContentStyle, HighContrastSelector } from '../../Styling';
import { getRTL } from '../../Utilities';

const GlobalClassNames = {
  root: 'ms-Shimmer-container',
  shimmerWrapper: 'ms-Shimmer-shimmerWrapper',
  shimmerGradient: 'ms-Shimmer-shimmerGradient',
  dataWrapper: 'ms-Shimmer-dataWrapper'
};

const BACKGROUND_OFF_SCREEN_POSITION = '100%';

const shimmerAnimation: string = keyframes({
  '0%': {
    transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`
  },
  '100%': {
    transform: `translateX(${BACKGROUND_OFF_SCREEN_POSITION})`
  }
});

const shimmerAnimationRTL: string = keyframes({
  '100%': {
    transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`
  },
  '0%': {
    transform: `translateX(${BACKGROUND_OFF_SCREEN_POSITION})`
  }
});

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const { isDataLoaded, className, theme, transitionAnimationInterval, shimmerColor, shimmerWaveColor } = props;

  const { semanticColors } = theme;
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
        position: 'relative',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        backgroundColor: shimmerColor || semanticColors.disabledBackground,
        transition: `opacity ${transitionAnimationInterval}ms`,
        selectors: {
          '> *': {
            transform: 'translateZ(0)'
          },
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
    shimmerGradient: [
      classNames.shimmerGradient,
      {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `${shimmerColor || semanticColors.disabledBackground}
                      linear-gradient(
                        to right,
                        ${shimmerColor || semanticColors.disabledBackground} 0%,
                        ${shimmerWaveColor || semanticColors.bodyDivider} 50%,
                        ${shimmerColor || semanticColors.disabledBackground} 100%)
                      0 0 / 90% 100%
                      no-repeat`,
        transform: `translateX(-${BACKGROUND_OFF_SCREEN_POSITION})`,
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: isRTL ? shimmerAnimationRTL : shimmerAnimation
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
