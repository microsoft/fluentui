import * as React from 'react';
import type { IStyle, ITheme } from '../../Styling';
import type { IPositioningContainerProps } from './PositioningContainer/PositioningContainer.types';
import type { IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import type { ITeachingBubble } from '../../TeachingBubble';
import type { Target } from '@fluentui/react-hooks';

/**
 * {@docCategory Coachmark}
 */
export interface ICoachmark {
  /**
   * Forces the Coachmark to dismiss
   */
  dismiss?: (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Coachmark component props
 * {@docCategory Coachmark}
 */
export interface ICoachmarkProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the `ICoachmark` interface. Use this instead of `ref` for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICoachmark>;

  /**
   * If provided, additional class name to provide on the root element.
   */
  className?: string;

  /**
   * Call to provide customized styling that will layer on top of the variant rules
   */
  styles?: IStyleFunctionOrObject<ICoachmarkStyleProps, ICoachmarkStyles>;

  /**
   * The target that the Coachmark should try to position itself based on.
   */
  target: Target;

  /**
   * Props to pass to the PositioningContainer component. Specify the `directionalHint` to indicate
   * on which edge the Coachmark/TeachingBubble should be positioned.
   * @defaultvalue `{ directionalHint: DirectionalHint.bottomAutoEdge }`
   */
  positioningContainerProps?: IPositioningContainerProps;

  /**
   * Whether or not to force the Coachmark/TeachingBubble content to fit within the window bounds.
   * @defaultvalue true
   */
  isPositionForced?: boolean;

  /**
   * The starting collapsed state for the Coachmark.
   * @defaultvalue true
   * @deprecated Use `isCollapsed` instead.
   */
  collapsed?: boolean;

  /**
   * The starting collapsed state for the Coachmark.
   * @defaultvalue true
   */
  isCollapsed?: boolean;

  /**
   * The distance in pixels the mouse is located before opening up the Coachmark.
   * @defaultvalue 10
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
   * @deprecated No longer used.
   */
  beakWidth?: number;

  /**
   * @deprecated No longer used.
   */
  beakHeight?: number;

  /**
   * Delay before allowing mouse movements to open the Coachmark.
   * @defaultvalue 3600
   */
  delayBeforeMouseOpen?: number;

  /**
   * Delay in milliseconds before Coachmark animation appears.
   * @defaultvalue 0
   */
  delayBeforeCoachmarkAnimation?: number;

  /**
   * Callback to run when the mouse moves.
   */
  onMouseMove?: (e: MouseEvent) => void;

  /**
   * @deprecated No longer used.
   */
  width?: number;

  /**
   * @deprecated No longer used.
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
   * Text for screen reader to announce when Coachmark is displayed
   */
  ariaAlertText?: string;

  /**
   * @deprecated Not used. Coachmark uses `focusFirstChild` utility instead to focus on TeachingBubbleContent.
   */
  teachingBubbleRef?: ITeachingBubble;

  /**
   * ID used for the internal element which contains label text for the Coachmark
   * (don't render an element with this ID yourself).
   */
  ariaLabelledBy?: string;

  /**
   * ID used for the internal element which contains description text for the Coachmark
   * (don't render an element with this ID yourself).
   */
  ariaDescribedBy?: string;

  /**
   * Defines the text content for the `ariaLabelledBy` element.
   * Not used unless `ariaLabelledBy` is also provided.
   */
  ariaLabelledByText?: string;

  /**
   * Defines the text content for the `ariaDescribedBy` element
   * Not used unless `ariaDescribedBy` is also provided.
   */
  ariaDescribedByText?: string;

  /**
   * If true then the Coachmark will not dismiss when it loses focus
   * @defaultvalue false
   */
  preventDismissOnLostFocus?: boolean;

  /**
   * If true then the Coachmark beak (arrow pointing towards target) will always be visible as long as
   * Coachmark is visible
   * @defaultvalue false
   */
  persistentBeak?: boolean;

  /**
   * If true then focus will not be set to the Coachmark when it mounts. Useful in cases where focus on coachmark
   * is causing other components in page to dismiss upon losing focus.
   * @defaultvalue false
   */
  preventFocusOnMount?: boolean;

  /**
   * Callback when the Coachmark tries to close.
   */
  onDismiss?: (ev?: Event | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;

  /**
   * Theme provided by higher order component.
   */
  theme?: ITheme;

  /**
   * Child nodes to render inside the Coachmark dialog
   */
  children?: React.ReactNode;
}

/**
 * The props needed to construct styles.
 * {@docCategory Coachmark}
 */
export interface ICoachmarkStyleProps {
  /**
   * ClassName to provide on the root style area.
   */
  className?: string;

  /**
   * Current theme.
   */
  theme?: ITheme;

  /**
   * Is the Coachmark collapsed.
   * @deprecated Use `isCollapsed` instead.
   */
  collapsed?: boolean;

  /**
   * Is the Coachmark collapsed
   */
  isCollapsed: boolean;

  /**
   * Is the component taking measurements
   */
  isMeasuring: boolean;

  /**
   * The height measured before the component has been mounted in pixels
   */
  entityHostHeight?: string;

  /**
   * The width measured in pixels
   */
  entityHostWidth?: string;

  /**
   * Width of the coachmark
   */
  width?: string;

  /**
   * Height of the coachmark
   */
  height?: string;

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

  /**
   * Transform origin for teaching bubble content
   */
  transformOrigin?: string;

  /**
   * Delay time for the animation to start
   */
  delayBeforeCoachmarkAnimation?: string;
}

/**
 * Represents the stylable areas of the control.
 * {@docCategory Coachmark}
 */
export interface ICoachmarkStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * The pulsing beacon that animates when the Coachmark is collapsed.
   */
  pulsingBeacon?: IStyle;

  /**
   * The layer, or div, that the translate animation will be applied to.
   */
  translateAnimationContainer?: IStyle;

  /**
   * The layer the Scale animation will be applied to.
   */
  scaleAnimationLayer?: IStyle;

  /**
   * The layer the Rotate animation will be applied to.
   */
  rotateAnimationLayer?: IStyle;

  /**
   * The layer that content/components/elements will be hosted in.
   */
  entityHost?: IStyle;

  /**
   * The inner layer that components will be hosted in
   * (primary purpose is scaling the layer down while the Coachmark collapses)
   */
  entityInnerHost: IStyle;

  /**
   * The layer that directly contains the TeachingBubbleContent
   */
  childrenContainer: IStyle;

  /**
   * The styles applied when the Coachmark has collapsed.
   */
  collapsed?: IStyle;

  /**
   * The styles applied to the ARIA attribute container
   */
  ariaContainer?: IStyle;
}

/**
 * @deprecated No longer used.
 * {@docCategory Coachmark}
 */
export type ICoachmarkTypes = ICoachmarkProps;
