import { keyframes } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const shimmerLoadingAnimationKeyframes = keyframes({
  '92.8%': {
    transform: 'translateX(100%)'
  },
  '100%': {
    transform: 'translateX(100%)'
  }
});

export interface IShimmerStyles {
  shimmerLoading: IStyle;
  shimmerLoadingBar: IStyle;
}

export const getStyles = (): IShimmerStyles => {
  return {
    shimmerLoading: {
      height: '300px',
      width: '240px',
      position: 'relative',
      bottom: '20%',
      /* scaling the y axis so we have nice round numbers to work with and get the size we want */
      transform: 'scaleY(0.2)',
      opacity: '0.6',
      overflow: 'hidden'
    },
    shimmerLoadingBar: {
      transform: 'translateX(-100%)',
      animation: '3.5s ' + shimmerLoadingAnimationKeyframes + ' infinite cubic-bezier(0.67, 0, 0.46, 1)'
    }
  };
};
