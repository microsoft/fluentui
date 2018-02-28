import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import { IStyle, IRawStyle, keyframes } from '../../Styling';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    isGeneric,
    hasCircle
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
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        padding: '10px',
        width: '100%',
        background: 'content-box',
        backgroundImage: 'linear-gradient(to right, #f4f4f4 0%, #eaeaea 50%, #f4f4f4 100%)',
        backgroundColor: '#f4f4f4',
        backgroundSize: '90% 100%',
        backgroundRepeat: 'no-repeat',
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: shimmerAnimation
      }
    ],
    circle: [
      'ms-Shimmer-circle',
      {
        width: '36px',
        height: '24px',
        fill: 'white'
      },
    ],
    line: [
      'ms-Shimmer-line',
      {
        color: 'transparent',
        width: '100%',
        height: '16px',
        boxSizing: 'border-box'
      },
      hasCircle && {
        height: '24px',
        borderBottom: '4px solid white',
        borderBottomWidth: '4px',
        borderBottomStyle: 'style',
        borderBottomColor: 'white',
        borderTop: '4px solid white',
        borderTopWidth: '4px',
        borderTopStyle: 'style',
        borderTopColor: 'white'
      }
    ]
  };
}
