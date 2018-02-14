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

function getBeakStyle(beakWidth?: number,
  beakStyle?: string): IRawStyle {
  let beakStyleWidth = beakWidth;

  // This is here to support the old way of setting the beak size until version 1.0.0.
  // beakStyle is now deprecated and will be be removed at version 1.0.0
  if (beakStyle === 'ms-Callout-smallbeak') {
    beakStyleWidth = 16;
  }

  return {
    height: beakStyleWidth,
    width: beakStyleWidth
  };
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
      getBeakStyle(beakWidth, beakStyle),
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
      overflowYHidden && {
        overflowY: 'hidden'
      },
      backgroundColor && {
        backgroundColor: backgroundColor
      }
    ],
  };
};