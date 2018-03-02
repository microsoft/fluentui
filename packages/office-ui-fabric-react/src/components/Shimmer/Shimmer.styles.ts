import { IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';
import {
  IStyle,
  IRawStyle,
  keyframes,
  DefaultPalette
} from '../../Styling';

export function getStyles(props: IShimmerStyleProps): IShimmerStyles {
  const {
    width
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
        alignItems: 'center',
        alignContent: 'space-between',
        padding: '10px',
        width: `${width}`,
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
  };
}
