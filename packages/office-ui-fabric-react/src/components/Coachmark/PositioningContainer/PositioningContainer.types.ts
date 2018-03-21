import * as React from 'react';
import { PositioningContainer } from './PositioningContainer';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';
import {
  IPoint,
  IRectangle
} from '../../../Utilities';
import { ICalloutPositon } from 'office-ui-fabric-react/lib/utilities/positioning';

export interface IPositioningContainer {
}

export interface IPositionInfo {
  calloutPosition: ICalloutPositon;
  beakPosition: { position: ICalloutPositon, display: string };
  directionalClassName: string;
  submenuDirection: DirectionalHint;
}

export interface IPositioningContainerTypes extends React.Props<PositioningContainer> {
  /**
  * All props for your component are to be defined here.
  */
  componentRef?: (component: IPositioningContainer | null) => void;
  /**
   * The target that the positioningContainer should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: HTMLElement | string | MouseEvent | IPoint | null;

  /**
   * How the element should be positioned
   * @default DirectionalHint.BottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * The gap between the positioningContainer and the target
   * @default 0
   */
  offsetFromTarget?: number;

  /**
   * Custom width for positioningContainer including borders. If value is 0, no width is applied.
   * @default 0
   */
  positioningContainerWidth?: number;

  /**
   * The background color of the positioningContainer in hex format ie. #ffffff.
   * @default $ms-color-white
   */
  backgroundColor?: string;

  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /**
   * The minimum distance the positioningContainer will be away from the edge of the screen.
   *  @default 8
   */
  minPagePadding?: number;

  /**
   * If true use a point rather than rectangle to position the positioningContainer.
   * For example it can be used to position based on a click.
   * @deprecated Use 'target' instead
   */
  useTargetPoint?: boolean;

  /**
   * Point used to position the positioningContainer
   * @deprecated Use 'target' instead
   */
  targetPoint?: IPoint;

  /**
   * If true then the onClose will not not dismiss on scroll
   * @default false
   */
  preventDismissOnScroll?: boolean;

  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   * @default false
   */
  coverTarget?: boolean;

  /**
   * Aria role assigned to the positioningContainer (Eg. dialog, alertdialog).
   */
  role?: string;

  /**
   * Accessible label text for positioningContainer.
   */
  ariaLabel?: string;

  /**
   *  Defines the element id referencing the element containing label text for positioningContainer.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the positioningContainer.
   */
  ariaDescribedBy?: string;

  /**
   * CSS class to apply to the positioningContainer.
   * @default null
   */
  className?: string;

  /**
   * Optional callback when the layer content has mounted.
   */
  onLayerMounted?: () => void;

  /**
   * Optional callback that is called once the positioningContainer has been correctly positioned.
   */
  onPositioned?: () => void;

  /**
   * Callback when the positioningContainer tries to close.
   */
  // tslint:disable-next-line:no-any
  onDismiss?: (ev?: any) => void;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   */
  doNotLayer?: boolean;

  /**
   * If true the position will not change sides in an attempt to fit the positioningContainer within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @default false
   */
  directionalHintFixed?: boolean;

  /**
   * Specify the final height of the content.
   * To be used when expanding the content dynamically so that positioningContainer can adjust its position.
   */
  finalHeight?: number;

  /**
   * If true then the positioningContainer will attempt to focus the first focusable element that it contains.
   * If it doesn't find an element, no focus will be set and the method will return false.
   * This means that it's the contents responsibility to either set focus or have
   * focusable items.
   * @returns True if focus was set, false if it was not.
   */
  setInitialFocus?: boolean;

  /**
   * Set max height of positioningContainer
   * When not set the positioningContainer will expand with contents up to the bottom of the screen
   */
  positioningContainerMaxHeight?: number;
}
