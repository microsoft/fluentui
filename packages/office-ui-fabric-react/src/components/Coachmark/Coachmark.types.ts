import * as React from 'react';
import { Coachmark } from './Coachmark';
import { ICoachmarkStyles, ICoachmarkStyleProps } from './Coachmark.styles';
import { IPositioningContainerTypes } from './PositioningContainer/PositioningContainer.types';
import { IStyleFunction } from '../../Utilities';
import { ITeachingBubble } from '../../TeachingBubble';

export interface ICoachmark {
}

export interface ICoachmarkTypes extends React.Props<Coachmark> {
  /**
   * Optional callback to access the ICoachmark interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICoachmark | null) => void;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  getStyles?: IStyleFunction<ICoachmarkStyleProps, ICoachmarkStyles>;

  /**
   * The target that the Coachmark should try to position itself based on.
   */
  target: HTMLElement | string | null;

  /**
   * Props to pass to the PositioningContainer component.  Specific the `directionalHint` to indicate which edge the
   * Coachmark/TeachingBubble should live.
   * @default directionalHint: DirectionalHint.bottomAutoEdge
   */
  positioningContainerProps?: IPositioningContainerTypes;

  /**
   * Whether or not to force the Coachmark/TeachingBubble content to fit within the window bounds.
   * @default true
   */
  isPositionForced?: boolean;

  /**
   * The starting collapsed state for the Coachmark.  Use isCollapsed instead.
   * @default true
   * @deprecated
   */
  collapsed?: boolean;

  /**
   * The starting collapsed state for the Coachmark.
   * @default true
   */
  isCollapsed?: boolean;

  /**
   * The distance in pixels the mouse is located
   * before opening up the Coachmark.
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
   * The width of the Beak component.
   * @deprecated
   */
  beakWidth?: number;

  /**
   * The height of the Beak component.
   * @deprecated
   */
  beakHeight?: number;

  /**
   * Delay before allowing mouse movements to open the Coachmark.
   * @default 3600
   */
  delayBeforeMouseOpen?: number;

  /**
   * Callback to run when the mouse moves.
   */
  onMouseMove?: (e: MouseEvent) => void;

  /**
   * The width of the Coachmark.
   * @deprecated
   */
  width?: number;

  /**
   * The height of the Coachmark.
   * @deprecated
   */
  height?: number;

  /**
   * Color of the Coachmark/TeachingBubble.
   */
  color?: string;

  /**
   * Beacon color one.
   */
  beaconColorOne?: string;

  /**
   * Beacon color two.
   */
  beaconColorTwo?: string;

  /**
   * Text to announce to screen reader / narrator when Coachmark is displayed
   */
  ariaAlertText?: string;

  /**
   * Ref for TeachingBubble
   */
  teachingBubbleRef?: ITeachingBubble;

  /**
   *  Defines the element id referencing the element containing label text for Coachmark.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the Coachmark.
   */
  ariaDescribedBy?: string;

  /**
   *  Defines the text content for the ariaLabelledBy element
   */
  ariaLabelledByText?: string;

  /**
   * Defines the text content for the ariaDescribedBy element
   */
  ariaDescribedByText?: string;
}
