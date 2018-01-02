import * as React from 'react';
import { Coachmark } from './Coachmark';
import { ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';
import { IPositioningContainerTypes } from '../PositioningContainer/PositioningContainer.types';
import { IPoint, IStyleFunction } from '../../Utilities';

export interface ICoachmark {
}

export interface ICoachmarkProps extends React.Props<Coachmark> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: ICoachmark) => void;

  /**
   * Get styles method
   */
  getStyles?: IStyleFunction<ICoachmarkStyleProps, ICoachmarkStyles>;

  /**
   * The target that the TeachingBubble should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: HTMLElement | string | MouseEvent | IPoint | null;

  positioningContainerProps?: IPositioningContainerTypes;

  /**
   * Is the Coachmark expanded
   * @default true
   */
  collapsed?: boolean;

  /**
   * The distance in pixels the mouse is located
   * before opening up the coachmark.
   * @default 100
   */
  mouseProximityOffset?: number;

  /**
   * Callback when the opening animation begins
   */
  onAnimationOpenStart?: () => void;

  /**
   * Callback when the opening animation completes
   */
  onAnimationOpenEnd?: () => void;
}
