import * as React from 'react';
import { Coachmark } from './Coachmark';
import { ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.Styles';
import { IDynamicallyPositionedContainerProps } from '../DynamicallyPositionedContainer/DynamicallyPositionedContainer.Props';
import {
  IPoint
} from '../../Utilities';
export type IStyleFunction<TStylesProps, TStyles> = (props: TStylesProps) => Partial<TStyles>;

export interface ICoachmark {
}

export interface ICoachmarkProps extends React.Props<Coachmark> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: ICoachmark) => void;

  /**
   * Called when the teaching bubble has been expanded.
   */
  onExpandComplete?: () => void;

  /**
   * Get styles method
   */
  getStyles?: IStyleFunction<ICoachmarkStyleProps, ICoachmarkStyles>;

  /**
   * The target that the TeachingBubble should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  positioningTarget?: HTMLElement | string | MouseEvent | IPoint | null;

  positioningContainerProps?: IDynamicallyPositionedContainerProps;

  /**
   * The distance in pixels the mouse is located
   * before opening up the coachmark.
   */
  mouseProximityOffset: number;
}
