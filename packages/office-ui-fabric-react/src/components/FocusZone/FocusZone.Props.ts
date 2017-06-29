import * as React from 'react';
import { FocusZone } from './FocusZone';

/**
 * FocusZone component class interface.
 */
export interface IFocusZone {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean;
}

/**
 * FocusZone component props.
 */
export interface IFocusZoneProps extends React.HTMLAttributes<HTMLElement | FocusZone> {
  /**
   * Optional callback to access the IFocusZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IFocusZone) => void;

  /**
   * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
   */
  className?: string;

  /**
   * Defines which arrows to react to.
   * @default FocusZoneDirection.bidriectional
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
   */
  ariaLabelledBy?: string;

  /**
   * Sets the aria-describedby attribute.
   */
  ariaDescribedBy?: string;

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;

  /**
   * Deprecated at v1.12.1. DIV props provided to the FocusZone will be mixed into the root element.
   * @deprecated
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param {HTMLElement} element The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  onBeforeFocus?: (childElement?: HTMLElement) => boolean;

  /** Allow focus to move to root */
  allowFocusRoot?: boolean;
}

export enum FocusZoneDirection {
  /** Only react to up/down arrows. */
  vertical = 0,

  /** Only react to left/right arrows. */
  horizontal = 1,

  /** React to all arrows. */
  bidirectional = 2
}
