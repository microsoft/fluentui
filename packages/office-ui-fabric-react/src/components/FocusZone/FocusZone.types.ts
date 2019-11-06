import * as React from 'react';
import { FocusZone } from './FocusZone';
import { IRefObject, IPoint } from '../../Utilities';

/**
 * FocusZone component class interface.
 * {@docCategory FocusZone}
 */
export interface IFocusZone {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
   * if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param element - The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean;

  /**
   * Forces horizontal alignment in the context of vertical arrowing to use specific point as the reference, rather than a center based on
   * the last horizontal motion.
   * @param point - the new reference point.
   */
  setFocusAlignment(point: IPoint): void;
}

/**
 * FocusZone component props.
 * {@docCategory FocusZone}
 */
export interface IFocusZoneProps extends React.HTMLAttributes<HTMLElement | FocusZone> {
  /**
   * Optional callback to access the IFocusZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IFocusZone>;

  /**
   * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
   */
  className?: string;

  /**
   * Defines which arrows to react to.
   * @defaultvalue FocusZoneDirection.bidirectional
   */
  direction?: FocusZoneDirection;

  /**
   * Optionally provide a selector for identifying the intial active element.
   */
  defaultActiveElement?: string;

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean;

  /**
   * Element type the root element will use. Default is "div".
   * @deprecated Use 'as' instead.
   */
  elementType?: any /* TODO should be `keyof React.ReactHTML`, tracking with https://github.com/Microsoft/TypeScript/issues/30050 */;

  /**
   * A component that should be used as the root element of the FocusZone component.
   */
  as?: React.ReactType;

  /**
   * If set, will cycle to the beginning of the targets once the user navigates to the
   * next target while at the end, and to the end when navigate to the previous at the beginning.
   */
  isCircularNavigation?: boolean;

  /**
   * If provided, this callback will be executed on keypresses to determine if the user
   * intends to navigate into the inner zone. Returning true will ask the first inner zone to
   * set focus.
   */
  isInnerZoneKeystroke?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;

  /**
   * Sets the aria-labelledby attribute.
   * @deprecated Directly use the `aria-labelledby` attribute instead
   */
  ariaLabelledBy?: string;

  /**
   * Sets the aria-describedby attribute.
   * @deprecated Directly use the `aria-describedby` attribute instead
   */
  ariaDescribedBy?: string;

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;

  /**
   * Deprecated at v1.12.1. DIV props provided to the FocusZone will be mixed into the root element.
   * @deprecated DIV props provided to the FocusZone will be mixed into the root element.
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param element - The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  onBeforeFocus?: (childElement?: HTMLElement) => boolean;

  /** Allow focus to move to root */
  allowFocusRoot?: boolean;

  /**
   * Allows tab key to be handled to tab through a list of items in the focus zone,
   * an unfortunate side effect is that users will not be able to tab out of the focus zone
   * and have to hit escape or some other key.
   * @deprecated Use `handleTabKey` instead.
   *
   */
  allowTabKey?: boolean;

  /**
   * Allows tab key to be handled to tab through a list of items in the focus zone,
   * an unfortunate side effect is that users will not be able to tab out of the focus zone
   * and have to hit escape or some other key.
   */
  handleTabKey?: FocusZoneTabbableElements;

  /**
   * A callback method to determine if the input element should lose focus on arrow keys
   *  @param inputElement - The input element which is to loose focus.
   *  @returns True if input element should loose focus or false otherwise.
   */
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean;

  /**
   * Whether the to check for data-no-horizontal-wrap or data-no-vertical-wrap attributes
   * when determining how to move focus
   * @defaultvalue false
   */
  checkForNoWrap?: boolean;

  /**
   * Whether the FocusZone should allow focus events to propagate past the FocusZone
   */
  doNotAllowFocusEventToPropagate?: boolean;

  /**
   * Callback to notify creators that focus has been set on the FocusZone
   */
  onFocusNotification?: () => void;
}
/**
 * {@docCategory FocusZone}
 */
export const FocusZoneTabbableElements = {
  /** Tabbing is not allowed */
  none: 0 as 0,

  /** All tabbing action is allowed */
  all: 1 as 1,

  /** Tabbing is allowed only on input elements */
  inputOnly: 2 as 2
};

/**
 * {@docCategory FocusZone}
 */
export type FocusZoneTabbableElements = typeof FocusZoneTabbableElements[keyof typeof FocusZoneTabbableElements];

/**
 * {@docCategory FocusZone}
 */
export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical = 0,

  /** Only react to left/right arrows. */
  horizontal = 1,

  /** React to all arrows. */
  bidirectional = 2,

  /**
   * React to all arrows. Navigate next item in DOM on right/down arrow keys and previous - left/up arrow keys.
   * Right and Left arrow keys are swapped in RTL mode.
   */
  domOrder = 3
}
