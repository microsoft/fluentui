import { keyframes } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const horizontalBarGraphLoadingAnimationBar1Keyframes = keyframes({
  ' 0%': {
    animationTimingFunction: 'cubic-bezier(0.67, 0, 0.46, 1)',
    transform: 'translateX(-100%)'
  },
  '92.8%': {
    transform: 'translateX(157%)'
  },
  '100%': {
    transform: 'translateX(157%)'
  }
});

const horizontalBarGraphLoadingAnimationBar2Keyframes = keyframes({
  '0%': {
    transform: 'translateX(-100%)'
  },
  '25%': {
    animationTimingFunction: 'cubic-bezier(0.67, 0, 0.43, 1)',
    transform: 'translateX(-100%)'
  },
  '90.6%': {
    transform: 'translateX(125%)'
  },
  '100%': {
    transform: 'translateX(125%)'
  }
});

export interface IHorizontalBarGraphStyles {
  horizontalBarGraphLoading: IStyle;
  horizontalBarGraphLoadingBar: IStyle;
  horizontalBarGraphLoadingBarFirst: IStyle;
  horizontalBarGraphLoadingBarSecond: IStyle;
}

export const getStyles = (): IHorizontalBarGraphStyles => {
  return {
    horizontalBarGraphLoading: {
      height: '300px',
      width: '300px',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'nowrap',
      flexDirection: 'column',
      opacity: '0.6',
      marginTop: '80px',
      selectors: {
        ':nth-child(1) :nth-child(1)': {
          animationName: horizontalBarGraphLoadingAnimationBar1Keyframes
        },
        ':nth-child(1) :nth-child(2)': {
          animationName: horizontalBarGraphLoadingAnimationBar2Keyframes,
          width: '80%'
        }
      }
    },
    horizontalBarGraphLoadingBar: {
      background: '#c2c2c2',
      height: '15%',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      flex: '0 1 auto'
    },
    horizontalBarGraphLoadingBarFirst: {
      background: '#62b2ed',
      position: 'absolute',
      display: 'inline-block',
      height: '190%',
      width: '65%',
      transform: 'translateX(-100%)',
      animationDuration: '3.5s',
      animationIterationCount: 'infinite'
    },
    horizontalBarGraphLoadingBarSecond: {
      background: '#0078d4',
      position: 'absolute',
      display: 'inline-block',
      height: '190%',
      width: '65%',
      transform: 'translateX(-100%)',
      animationDuration: '3.5s',
      animationIterationCount: 'infinite'
    }
  };
};
