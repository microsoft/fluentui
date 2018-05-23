import * as React from 'react';
import { Coachmark } from './Coachmark';
import { ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';
import { IPositioningContainerTypes } from './PositioningContainer/PositioningContainer.types';
import { IStyleFunction } from '../../Utilities';

export interface ICoachmark {
}

export interface ICoachmarkTypes extends React.Props<Coachmark> {
  componentRef?: (component: ICoachmark | null) => void;

  /**
   * Get styles method.
   */
  getStyles?: IStyleFunction<ICoachmarkStyleProps, ICoachmarkStyles>;

  /**
   * The target that the TeachingBubble should try to position itself based on.
   */
  target: HTMLElement | string | null;

  positioningContainerProps?: IPositioningContainerTypes;

  isPositionForced?: boolean;

  /**
   * The starting collapsed state for the Coachmark?
   * @default true
   */
  isCollapsed?: boolean;

  /**
   * The distance in pixels the mouse is located
   * before opening up the coachmark.
   * @default 10
   */
  mouseProximityOffset?: number;

  /**
   * Callback when the opening animation begins.
   */
  onAnimationOpenStart?: () => void;

  /**
   * Callback when the opening animation completes.
   */
  onAnimationOpenEnd?: () => void;

  /**
   * Delay before allowing mouse movements to open
   * the Coachmark
   */
  delayBeforeMouseOpen?: number;

  /**
   * Runs every time the mouse moves
   */
  onMouseMove?: (e: MouseEvent) => void;

  /**
   * Color
   */
  color?: string;

  /**
   * Beacon color one
   */
  beaconColorOne?: string;

  /**
   * Beacon color two
   */
  beaconColorTwo?: string;
}
