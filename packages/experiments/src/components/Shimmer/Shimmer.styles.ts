import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import {
  keyframes,
  DefaultPalette
} from '../../Styling';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    width,
    maxHeight,
    isDataLoaded
  } = props;

  const shimmerAnimation: string = keyframes({
    '0%': {
      backgroundPosition: '-900%'
    },
    '100%': {
      backgroundPosition: '1000%'
    }
  });

  return {
    root: [
      'ms-Shimmer-container',
      {
        position: 'relative',
        margin: '10px',
        boxSizing: 'content-box',
        minHeight: maxHeight ? `${maxHeight}px` : '16px'
      }
    ],
    shimmerWrapper: [
      'ms-Shimmer-shimmerWrapper',
      {
        display: 'flex',
        position: 'absolute',
        top: '0',
        alignItems: 'center',
        alignContent: 'space-between',
        width: `${width}%`,
        height: 'auto',
        boxSizing: 'border-box',
        background: `${DefaultPalette.neutralLighter}
                    linear-gradient(
                      to right,
                      ${DefaultPalette.neutralLighter} 0%,
                      ${DefaultPalette.neutralLight} 50%,
                      ${DefaultPalette.neutralLighter} 100%)
                    0 0 / 90% 100%
                    no-repeat
                    content-box`,
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: shimmerAnimation,
        transition: 'opacity 200ms, visibility 200ms'
      },
      isDataLoaded && {
        opacity: '0',
        visibility: 'hidden'
      }
    ],
    dataWrapper: [
      'ms-Shimmer-dataWrapper',
      {
        opacity: '0',
        lineHeight: '1',
        background: 'none',
        border: 'none',
        transition: 'opacity 200ms'
      },
      isDataLoaded && {
        opacity: '1'
      }
    ]
  };
}
