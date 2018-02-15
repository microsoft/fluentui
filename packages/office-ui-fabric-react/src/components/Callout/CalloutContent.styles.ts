import {
  HighContrastSelector,
  AnimationStyles,
  IRawStyle,
  focusClear,
} from '../../Styling';
import {
  ICalloutPositionedInfo,
  RectangleEdge
} from '../../utilities/positioning';
import { ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';
import { keyframes } from '@uifabric/merge-styles/lib/index';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };

const ANIMATIONS: { [key: number]: IRawStyle; } = {
  [RectangleEdge.top]: AnimationStyles.slideUpIn20,
  [RectangleEdge.bottom]: AnimationStyles.slideDownIn20,
  [RectangleEdge.left]: AnimationStyles.slideLeftIn20,
  [RectangleEdge.right]: AnimationStyles.slideRightIn20,
};

// Source:
// http://bouncejs.com/#{s:[{T:"c",e:"b",d:1000,D:0,f:{x:1,y:1},t:{x:2,y:1},s:1,b:4},{T:"c",e:"b",d:1000,D:0,f:{x:1,y:1},t:{x:1,y:2},s:1,b:6}]}
// ^ all of the first 2 non zero values in the matrix3d are divided by 2
const BOUNCE: string = keyframes({
  '0%': { transform: 'matrix3d(.5, 0, 0, 0, 0, .5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '19.2%': { transform: 'matrix3d(.658, 0, 0, 0, 0, .704, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '19.85%': { transform: 'matrix3d(.725, 0, 0, 0, 0, .8, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '20.9%': { transform: 'matrix3d(.83, 0, 0, 0, 0, .947, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '22.2%': { transform: 'matrix3d(.942, 0, 0, 0, 0, 1.084, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '22.61%': { transform: 'matrix3d(.971, 0, 0, 0, 0, 1.113, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '24.31%': { transform: 'matrix3d(1.062, 0, 0, 0, 0, 1.161, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '24.56%': { transform: 'matrix3d(1.071, 0, 0, 0, 0, 1.17, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '26.26%': { transform: 'matrix3d(1.104, 0, 0, 0, 0, 1.1195, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '26.86%': { transform: 'matrix3d(1.106, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '28.16%': { transform: 'matrix3d(1.098, 0, 0, 0, 0, 1.035, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '29.66%': { transform: 'matrix3d(1.08, 0, 0, 0, 0, .98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '30.11%': { transform: 'matrix3d(1.067, 0, 0, 0, 0, .969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '32.01%': { transform: 'matrix3d(1.032, 0, 0, 0, 0, .95, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '32.46%': { transform: 'matrix3d(1.024, 0, 0, 0, 0, 0.9495, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '35.27%': { transform: 'matrix3d(0.99, 0, 0, 0, 0, 0.981, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '35.87%': { transform: 'matrix3d(0.986, 0, 0, 0, 0, .99, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '38.02%': { transform: 'matrix3d(.981, 0, 0, 0, 0, 1.011, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '39.72%': { transform: 'matrix3d(0.983, 0, 0, 0, 0, 1.016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '43.58%': { transform: 'matrix3d(.996, 0, 0, 0, 0, 1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '47.43%': { transform: 'matrix3d(1.003, 0, 0, 0, 0, 0.995, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '49.13%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, 0.996, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '49.9%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, 0.997, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '50%': { transform: 'matrix3d(1.004, 0, 0, 0, 0, .998, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '52.15%': { transform: 'matrix3d(1.003, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '54.3%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '55.14%': { transform: 'matrix3d(1.001, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '56.46%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1.002, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '58.61%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '60.24%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '62.85%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '64.16%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '67.5%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '69.72%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '80.83%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '91.99%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' },
  '100%': { transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)' }
});

const OPACITY_FADEIN: string = keyframes({
  '0%': {
    opacity: 0,
    animationTimingFunction: '$ms-animation-ease-2'
  },
  '24.31%': { opacity: 1 },
  '100%': { opacity: 1 }
});

const bounceAnimation: IRawStyle = {
  animationName: `${BOUNCE}, ${OPACITY_FADEIN}`,
  animationDuration: '2000ms',
  animationTimingFunction: 'linear',
  animationFillMode: 'both'
};

function getBeakStylePosition(positions?: ICalloutPositionedInfo,
  beakWidth?: number,
  beakStyle?: string): IRawStyle {
  let beakStyleWidth = beakWidth;

  // This is here to support the old way of setting the beak size until version 1.0.0.
  // beakStyle is now deprecated and will be be removed at version 1.0.0
  if (beakStyle === 'ms-Callout-smallbeak') {
    beakStyleWidth = 16;
  }

  let beakReactStyle: IRawStyle = {
    ...(positions && positions.beakPosition ? positions.beakPosition.elementPosition : null),
  };
  beakReactStyle.height = beakStyleWidth;
  beakReactStyle.width = beakStyleWidth;
  if (!beakReactStyle.top && !beakReactStyle.bottom && !beakReactStyle.left && !beakReactStyle.right) {
    beakReactStyle.left = BEAK_ORIGIN_POSITION.left;
    beakReactStyle.top = BEAK_ORIGIN_POSITION.top;
  }

  return beakReactStyle;
}

export const getStyles = (props: ICalloutContentStyleProps): ICalloutContentStyles => {
  const {
    theme,
    className,
    overflowYHidden,
    calloutWidth,
    contentMaxHeight,
    positions,
    beakWidth,
    backgroundColor,
    beakStyle
  } = props;

  const { palette } = theme;
  return {
    container: [
      'ms-Callout-container',
      {
        position: 'relative',
      }
    ],
    root: [
      'ms-Callout',
      {
        position: 'absolute',
        boxSizing: 'border-box',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.neutralLight,
        boxShadow: '0 0 5px 0px rgba(0,0,0,0.4)',
        selectors: {
          [HighContrastSelector]: {
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'WindowText',
          }
        }
      },
      focusClear(),
      className,
      bounceAnimation,
      // positions && positions.targetEdge && ANIMATIONS[positions.targetEdge],
      // Microsoft Edge will overwrite inline styles if there is an animation pertaining to that style.
      // To help ensure that edge will respect the offscreen style opacity
      // filter needs to be added as an additional way to set opacity.
      !positions && {
        opacity: 0,
        filter: 'opacity(0)',
      },
      positions && { ...positions.elementPosition },
      !!calloutWidth && { width: calloutWidth },
    ],
    beak: [
      'ms-Callout-beak',
      {
        position: 'absolute',
        backgroundColor: palette.white,
        boxShadow: 'inherit',
        border: 'inherit',
        boxSizing: 'border-box',
        transform: 'rotate(45deg)'
      },
      getBeakStylePosition(positions, beakWidth, beakStyle),
      backgroundColor && {
        backgroundColor: backgroundColor
      }
    ],
    beakCurtain: [
      'ms-Callout-beakCurtain',
      {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: palette.white,
      }
    ],
    calloutMain: [
      'ms-Callout-main',
      {
        backgroundColor: palette.white,
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'relative',
        maxHeight: contentMaxHeight
      },
      !!calloutWidth && { width: calloutWidth },
      overflowYHidden && {
        overflowY: 'hidden'
      },
      backgroundColor && {
        backgroundColor: backgroundColor
      }
    ],
  };
};