import { keyframes } from 'office-ui-fabric-react/lib/Styling';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const donutChartLoadingSegmentAnimationSegment1Keyframes = keyframes({
  '90%': {
    strokeDashoffset: '-100'
  },
  '100%': {
    strokeDashoffset: '-100'
  }
});

const donutChartLoadingSegmentAnimationSegment2Keyframes = keyframes({
  '9%': {
    strokeDashoffset: '23'
  },
  '93%': {
    strokeDashoffset: '-100'
  },
  '100%': {
    strokeDashoffset: '-100'
  }
});

export interface IDonutChartStyles {
  donutChartLoading: IStyle;
  donutChartLoadingSegment: IStyle;
  donutChartLoadingBase: IStyle;
  donutChartLoadingSegmentFirst: IStyle;
  donutChartLoadingSegmentSecond: IStyle;
  // tslint:disable-next-line:no-any
  donutChartLoadingSegmentAnimation: any;
}

export const getStyles = (): IDonutChartStyles => {
  return {
    donutChartLoading: {
      height: '100%',
      width: '100%',
      transform: 'rotate(-0.25turn)',
      opacity: '0.6',
      selectors: {
        'circle:nth-child(2)': {
          animationName: donutChartLoadingSegmentAnimationSegment1Keyframes
        },
        'circle:nth-child(3)': {
          animationName: donutChartLoadingSegmentAnimationSegment2Keyframes
        }
      }
    },
    donutChartLoadingSegment: {
      strokeWidth: '8px',
      fill: 'none'
    },
    donutChartLoadingBase: {
      stroke: '#c2c2c2'
    },
    donutChartLoadingSegmentFirst: {
      stroke: '#62b2ed'
    },
    donutChartLoadingSegmentSecond: {
      stroke: '#0078d4'
    },
    donutChartLoadingSegmentAnimation: {
      animationDuration: '3.5s',
      animationIterationCount: 'infinite',
      strokeDasharray: '23 100',
      strokeDashoffset: '23',
      animationTimingFunction: 'cubic-bezier(0.45, 0, 0.37, 1)'
    }
  };
};
