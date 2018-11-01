import { keyframes } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const lineChartLoadingSegmentAnimationSegment1Keyframes = keyframes({
  '90%': {
    strokeDashoffset: '-105%'
  },
  '100%': {
    strokeDashoffset: '-105%'
  }
});

const lineChartLoadingSegmentAnimationSegment2Keyframes = keyframes({
  '9%': {
    strokeDashoffset: '65%'
  },
  '97%': {
    strokeDashoffset: '-105%'
  },
  '100%': {
    strokeDashoffset: '-105%'
  }
});

export interface ILineChartStyles {
  lineChartLoading: IStyle;
  lineChartLoadingSegment: IStyle;
  // tslint:disable-next-line:no-any
  lineChartLoadingSegmentFirst: any;
  // tslint:disable-next-line:no-any
  lineChartLoadingSegmentSecond: any;
}

export const getStyles = (): ILineChartStyles => {
  return {
    lineChartLoading: {
      height: '100%',
      width: '100%',
      opacity: '0.6',
      selectors: {
        ':nth-child(1) :nth-child(2)': {
          animationName: lineChartLoadingSegmentAnimationSegment1Keyframes
        },
        ':nth-child(2) :nth-child(2)': {
          animationName: lineChartLoadingSegmentAnimationSegment2Keyframes
        }
      }
    },
    lineChartLoadingSegment: {
      fill: 'none',
      strokeWidth: '5px',
      stroke: '#c2c2c2'
    },
    lineChartLoadingSegmentFirst: {
      fill: 'none',
      strokeWidth: '5px',
      stroke: '#62b2ed',
      strokeDasharray: '65% 110%',
      strokeDashoffset: '65%',
      animationDuration: '3.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.45, 0, 0.37, 1)'
    },
    lineChartLoadingSegmentSecond: {
      fill: 'none',
      strokeWidth: '5px',
      stroke: '#0078d4',
      strokeDasharray: '65% 110%',
      strokeDashoffset: '65%',
      animationDuration: '3.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'cubic-bezier(0.45, 0, 0.37, 1)'
    }
  };
};
