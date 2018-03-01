import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import {
  IStyle,
  IRawStyle,
  keyframes,
  DefaultPalette
} from '../../Styling';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {

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
        alignItems: 'center',
        padding: '10px',
        width: '100%',
        height: 'auto',
        boxSizing: 'border-box',
        background: 'content-box',
        backgroundImage: `linear-gradient(to right, ${DefaultPalette.neutralLighter} 0%, ${DefaultPalette.neutralLight} 50%, ${DefaultPalette.neutralLighter} 100%)`,
        backgroundColor: `${DefaultPalette.neutralLighter}`,
        backgroundSize: '90% 100%',
        backgroundRepeat: 'no-repeat',
        animationDuration: '2s',
        animationTimingFunction: 'ease-in-out',
        animationDirection: 'normal',
        animationIterationCount: 'infinite',
        animationName: shimmerAnimation
      }
    ]
    // hasCircle && {
    //   height: '24px',
    //   borderBottom: `4px solid ${DefaultPalette.white}`,
    //   borderBottomWidth: '4px',
    //   borderBottomStyle: 'solid',
    //   borderBottomColor: `${DefaultPalette.white}`,
    //   borderTop: `4px solid ${DefaultPalette.white}`,
    //   borderTopWidth: '4px',
    //   borderTopStyle: 'solid',
    //   borderTopColor: `${DefaultPalette.white}`
    // }
  };
}
