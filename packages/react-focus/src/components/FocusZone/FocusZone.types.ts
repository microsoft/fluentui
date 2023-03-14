import * as React from 'react';
import type { IRefObject, Point } from '@fluentui/utilities';

/**
 * FocusZone component class interface.
 * {@docCategory FocusZone}
 */
export interface IFocusZone {
  /**
   * Sets focus to the first tabbable item in the zone.
   * @param forceIntoFirstElement - If true, focus will be forced into the first element, even
   * if focus is already in the focus zone.
   * @param bypassHiddenElements - If true, focus will be not be set on hidden elements.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focus(forceIntoFirstElement?: boolean, bypassHiddenElements?: boolean): boolean;

  /**
   * Sets focus to the last tabbable item in the zone.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusLast(): boolean;

  /**
   * Sets focus to a specific child element within the zone. This can be used in conjunction with
   * shouldReceiveFocus to create delayed focus scenarios (like animate the scroll position to the correct
   * location and then focus.)
   * @param childElement - The child element within the zone to focus.
   * @param forceAlignment - If true, focus alignment will be set according to the element provided.
   * @returns True if focus could be set to an active element, false if no operation was taken.
   */
  focusElement(childElement?: HTMLElement, forceAlignment?: boolean): boolean;

  /**
   * Forces horizontal alignment in the context of vertical arrowing to use specific point as the reference, rather
   * than a center based on the last horizontal motion.
   * @param point - the new reference point.
   */
  setFocusAlignment(point: Point): void;
}

/**
 * FocusZone component props.
 * {@docCategory FocusZone}
 */
export interface IFocusZoneProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IFocusZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IFocusZone>;

  /**
   * Optional callback to access the root DOM element.
   * @deprecated Temporary solution which will be replaced with ref in the V8 release.
   */
  elementRef?: React.Ref<HTMLElement>;

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
   * Optionally defines the initial tabbable element inside the FocusZone.
   * If a string is passed then it is treated as a selector for identifying the initial tabbable element.
   * If a function is passed then it uses the root element as a parameter to return the initial tabbable element.
   */
  defaultTabbableElement?: string | ((root: HTMLElement) => HTMLElement);

  /**
   * Optionally provide a selector for identifying the initial active element.
   * @deprecated Use `defaultTabbableElement` instead.
   */
  defaultActiveElement?: string;

  /**
   * Determines if a default tabbable element should be force focused on FocusZone mount.
   * @default false
   */
  shouldFocusOnMount?: boolean;

  /**
   * If set, the FocusZone will not be tabbable and keyboard navigation will be disabled.
   * This does not affect disabled attribute of any child.
   */
  disabled?: boolean;

  /**
   * Element type the root element will use. Default is "div".
   * @deprecated Use `as` instead.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  elementType?: any /* TODO should be `keyof React.ReactHTML`, tracking with https://github.com/Microsoft/TypeScript/issues/30050 */;

  /**
   * A component that should be used as the root element of the FocusZone component.
   */
  as?: React.ElementType;

  /**
   * If set, will cycle to the beginning of the targets once the user navigates to the
   * next target while at the end, and to the end when navigate to the previous at the beginning.
   */
  isCircularNavigation?: boolean;

  /**
   * If provided, this callback will be executed on keypresses to determine if the user
   * intends to navigate into the inner zone. Returning true will ask the first inner zone to
   * set focus.
   * @deprecated Use `shouldEnterInnerZone` instead.
   */
  isInnerZoneKeystroke?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;

  /**
   * Callback function that will be executed on keypresses to determine if the user intends to navigate into
   * the inner (nested) zone. Returning true will ask the first inner zone to set focus.
   */
  shouldEnterInnerZone?: (ev: React.KeyboardEvent<HTMLElement>) => boolean;

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
   * @deprecated Div props provided to the FocusZone will be mixed into the root element.
   * Deprecated at v1.12.1.
   */
  rootProps?: React.HTMLAttributes<HTMLDivElement>;

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param element - The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   * @deprecated Use `shouldReceiveFocus` instead.
   */
  onBeforeFocus?: (childElement?: HTMLElement) => boolean;

  /**
   * Callback method for determining if focus should indeed be set on the given element.
   * @param element - The child element within the zone to focus.
   * @returns True if focus should be set to the given element, false to avoid setting focus.
   */
  shouldReceiveFocus?: (childElement?: HTMLElement) => boolean;

  /** Allows focus to park on root when focus is in the `FocusZone` at render time. */
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
   * If true and FocusZone's root element (container) receives focus, the focus will land either on the
   * defaultTabbableElement (if set) or on the first tabbable element of this FocusZone.
   * Usually a case for nested focus zones, when the nested focus zone's container is a focusable element.
   */
  shouldFocusInnerElementWhenReceivedFocus?: boolean;

  /**
   * If true and TAB key is not handled by FocusZone, resets current active element to null value.
   * For example, when roving index is not desirable and focus should always reset to the default tabbable element.
   */
  shouldResetActiveElementWhenTabFromZone?: boolean;

  /**
   * Determines whether the FocusZone will walk up the DOM trying to invoke click callbacks on focusable elements on
   * Enter and Space keydowns to ensure accessibility for tags that don't guarantee this behavior.
   * @defaultvalue true
   */
  shouldRaiseClicks?: boolean;

  /**
   * Relates to `shouldRaiseClicks`.
   * Allows the click event raising for the "Enter" key to be set independently from `shouldRaiseClicks`.
   * Inherits the value of `shouldRaiseClicks` if not set explicitly.
   */
  shouldRaiseClicksOnEnter?: boolean;

  /**
   * Relates to `shouldRaiseClicks`.
   * Allows the click event raising for the "Space" key to be set independently from `shouldRaiseClicks`.
   * Inherits the value of `shouldRaiseClicks` if not set explicitly.
   */
  shouldRaiseClicksOnSpace?: boolean;

  /**
   * A callback method to determine if an input or textarea element should lose focus on arrow keys
   *  @param inputElement - The input or textarea element which is to lose focus.
   *  @returns True if input element should loose focus or false otherwise.
   */
  shouldInputLoseFocusOnArrowKey?: (inputElement: HTMLInputElement | HTMLTextAreaElement) => boolean;

  /**
   * Determines whether to disable the paging support for Page Up and Page Down keyboard scenarios.
   * @defaultvalue false
   */
  pagingSupportDisabled?: boolean;

  /**
   * Determines whether to check for data-no-horizontal-wrap or data-no-vertical-wrap attributes
   * when determining how to move focus
   * @defaultvalue false
   */
  checkForNoWrap?: boolean;

  /**
   * Whether the FocusZone should allow focus events to propagate past the FocusZone.
   * @deprecated Use `stopFocusPropagation` instead.
   */
  doNotAllowFocusEventToPropagate?: boolean;

  /**
   * Whether the FocusZone should allow focus events to propagate past the FocusZone.
   */
  stopFocusPropagation?: boolean;

  /**
   * Callback to notify creators that focus has been set on the FocusZone
   * @deprecated Use `onFocus` instead.
   */
  onFocusNotification?: () => void;

  /**
   * Callback called when "focus" event triggered in FocusZone.
   * @param event - React's original FocusEvent.
   */
  onFocus?: (event: React.FocusEvent<HTMLElement>) => void;

  /**
   * If true, FocusZone prevents the default behavior of Keyboard events when changing focus between elements.
   * @defaultvalue false
   */
  preventDefaultWhenHandled?: boolean;

  /**
   * If true, prevents the FocusZone from attempting to restore the focus to the inner element when the focus is on the
   * root element after componentDidUpdate.
   * @defaultvalue false
   */
  preventFocusRestoration?: boolean;
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
  inputOnly: 2 as 2,
};

/**
 * {@docCategory FocusZone}
 */
export type FocusZoneTabbableElements = (typeof FocusZoneTabbableElements)[keyof typeof FocusZoneTabbableElements];

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
  domOrder = 3,
}
