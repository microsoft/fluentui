import { FocusZoneDirection, FocusZoneProperties, FocusZoneTabbableElements } from '@fluentui/accessibility';
import * as React from 'react';

import FocusZone from './FocusZone';

/**
 * FocusZone component class interface.
 */
export interface IFocusZone {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even if focus is already in the focus zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean): boolean;

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusLast(): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param element - The child element within the zone to focus.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement): boolean;
}

// Heads up! Keep in sync with packages/accessibility/src/focusZone/types.ts
/**
 * FocusZone component props.
 */
export interface FocusZoneProps extends FocusZoneProperties, React.HTMLAttributes<HTMLElement> {
  /** @docSiteIgnore */
  as?: React.ReactType;
  /**
   * Additional class name to provide on the root element, in addition to the ms-FocusZone class.
   */
  className?: string;

  /**
   * Defines which arrows to react to.
   * It has next options: horizontal, vertical, bidirectional, bidirectionalDomOrder.
   * @default FocusZoneDirection.bidirectional
   */
  direction?: FocusZoneDirection;

  /**
   * Function which uses root element as parameter to return the intial tabbable element.
   * For example, when there is a chat with a bottom-up approach, it is expected that the last chat message is tabbable (active), not the first default one.
   */
  defaultTabbableElement?: (root: HTMLElement) => HTMLElement;

  /**
   * Determines if a default tabbable element should be force focused on FocusZone mount.
   * @default false
   */
  shouldFocusOnMount?: boolean;

  /**
   * if true and FocusZone's root element (container) receives focus, the focus will land either on the defaultTabbableElement
   * (if set) or on the first tabbable element of this FocusZone.
   * Usually a case for nested focus zones, when nested focus zone's container is a focusable element.
   */
  shouldFocusInnerElementWhenReceivedFocus?: boolean;

  /**
   * If true and TAB key is not handled by FocusZone, resets current active element to null value.
   * For example, when roving index is not desirable and focus should always reset to the default tabbable element.
   */
  shouldResetActiveElementWhenTabFromZone?: boolean;

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean;

  /**
   * If true, FocusZone behavior will change to match RTL environments (left/right arrows switched).
   */
  isRtl?: boolean;

  /**
   * If true, will cycle to the beginning of the targets once the user attempts to navigate past the last
   * target while at the end, and to the end when the user attempts to naviagate before the first target.
   */
  isCircularNavigation?: boolean;

  /**
   * Callback function that will be executed on keypresses to determine if the user intends to navigate into
   * the inner (nested) zone. Returning true will ask the first inner zone to set focus.
   * For example, when chat container is FocusZone and chat messages are inner focus zones.
   * Navigation between messages possible with up/down arrow keys, but when pressing Enter, focus should go to
   * focusable elements inside message, for example, a link.
   */
  shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;

  /**
   * Callback for when one of immediate children elements gets active by getting focused
   * or by having one of its respective children elements focused.
   */
  onActiveElementChanged?: (element?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) => void;

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param element - The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  shouldReceiveFocus?: (childElement?: HTMLElement) => boolean;

  /** Allows focus to park on root when focus is in the `FocusZone` at render time. */
  allowFocusRoot?: boolean;

  /**
   * Allows TAB key to be handled, thus alows tabbing through a focusable list of items in the
   * focus zone. A side effect is that users will not be able to TAB out of the focus zone and
   * have to hit escape or some other key to exit focus zone.
   * Enum options:
   * none - tabbing is not allowed
   * all - all tabbing action is allowed
   * inputOnly - tabbing is allowed only on input elements
   */
  handleTabKey?: FocusZoneTabbableElements;

  /**
   * A callback method to determine if the input element should lose focus on arrow keys.
   * For example: use arrow keys to navigate when an input element is empty or when cursor is at the beginning/end of a string.
   * @param inputElement - The input element which is to lose focus.
   * @returns True if input element should lose focus or false otherwise.
   */
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement) => boolean;

  /**
   * If true, focus event propagation will be stopped.
   */
  stopFocusPropagation?: boolean;

  /**
   * Callback called when "focus" event triggered in FocusZone.
   * @param event - React's original FocusEvent.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement | FocusZone>) => void;

  /**
   * If true, FocusZone prevents the default behavior of Keyboard events when changing focus between elements.
   */
  preventDefaultWhenHandled?: boolean;

  /**
   * If focus is on root element after componentDidUpdate, will attempt to restore the focus to inner element
   */
  restoreFocusFromRoot?: boolean;
}
