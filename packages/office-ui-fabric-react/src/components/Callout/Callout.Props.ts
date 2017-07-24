import * as React from 'react';
import { Callout } from './Callout';
import { CalloutContent } from './CalloutContent';
import { DirectionalHint } from '../../common/DirectionalHint';
import {
  IPoint,
  IRectangle,
} from '../../Utilities';

export interface ICallout {

}

export interface ICalloutProps extends React.Props<Callout | CalloutContent> {
  /**
   * Optional callback to access the ICallout interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICallout) => void;

  /**
   * The target that the Callout should try to position itself based on.
   * It can be either an HTMLElement a querySelector string of a valid HTMLElement
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: HTMLElement | string | MouseEvent;

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
   * The gap between the Callout and the target
   * @default 0
   */
  gapSpace?: number;

  /**
   * The width of the beak.
   * @default 16
   */
  beakWidth?: number;

  /**
   * The background color of the Callout in hex format ie. #ffffff.
   * @default $ms-color-white
   */
  backgroundColor?: string;

  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /**
   * The minimum distance the callout will be away from the edge of the screen.
   *  @default 8
   */
  minPagePadding?: number;

  /**
   * If true use a point rather than rectangle to position the Callout.
   * For example it can be used to position based on a click.
   */
  useTargetPoint?: boolean;

  /**
   * Point used to position the Callout
   */
  targetPoint?: IPoint;

  /**
   * If true then the beak is visible. If false it will not be shown.
   * @default true
   */
  isBeakVisible?: boolean;

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
   * Aria role assigned to the callout (Eg. dialog, alertdialog).
   */
  role?: string;

  /**
   * Accessible label text for callout.
   */
  ariaLabel?: string;

  /**
   *  Defines the element id referencing the element containing label text for callout.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the callout.
   */
  ariaDescribedBy?: string;

  /**
   * CSS class to apply to the callout.
   * @default null
   */
  className?: string;

  /**
   * Optional callback when the layer content has mounted.
   */
  onLayerMounted?: () => void;

  /**
   * Optional callback that is called once the callout has been correctly positioned.
   */
  onPositioned?: () => void;

  /**
   * Callback when the Callout tries to close.
   */
  onDismiss?: (ev?: any) => void;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   */
  doNotLayer?: boolean;

  /**
   * If true the position will not change sides in an attempt to fit the callout within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @default false
   */
  directionalHintFixed?: boolean;

  /**
   * Specify the final height of the content.
   * To be used when expanding the content dynamically so that callout can adjust its position.
   */
  finalHeight?: number;

  /**
   * If true then the callout will attempt to focus the first focusable element that it contains.
   * If it doesn't find an element, no focus will be set and the method will return false.
   * This means that it's the contents responsibility to either set focus or have
   * focusable items.
   * @returns True if focus was set, false if it was not.
   */
  setInitialFocus?: boolean;

  /**
    * Deprecated at v0.59.1, to be removed at >= v1.0.0. Pass in a beakWidth to dictate size.
    * @deprecated
    */
  beakStyle?: string;

  /**
   * Deprecated at v0.72.1 and will no longer exist after 1.0 use target instead.
   * @deprecated
   */
  targetElement?: HTMLElement;
}
