import {
  HighContrastSelector,
  AnimationStyles,
  IRawStyle,
  focusClear
} from '../../Styling';
import {
  ICalloutPositionedInfo,
  RectangleEdge
} from '../../utilities/positioning';
import { ICalloutContentStyleProps, ICalloutContentStyles } from './Callout.types';

const BEAK_ORIGIN_POSITION = { top: 0, left: 0 };

const ANIMATIONS: { [key: number]: IRawStyle; } = {
  [RectangleEdge.top]: AnimationStyles.slideUpIn20,
  [RectangleEdge.bottom]: AnimationStyles.slideDownIn20,
  [RectangleEdge.left]: AnimationStyles.slideLeftIn20,
  [RectangleEdge.right]: AnimationStyles.slideRightIn20,
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
      positions && positions.targetEdge && ANIMATIONS[positions.targetEdge],
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