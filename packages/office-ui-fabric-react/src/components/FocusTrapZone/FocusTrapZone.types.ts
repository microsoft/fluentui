import * as React from 'react';

/**
 * Algorithm used to determine which descendant element to focus when the FocusTrapZone is focused.
 */
export const enum FocusTransferRule {
  /** Locate and focus the first focusable descendant, filtered by the firstFocusableSelector property if present. */
  firstFocusable = 0,
  /**
   * Go to the element that was focused when this FocusTrapZone last had a focused descendant.
   * If it has never had a focused descendant before, behavior falls back to FirstFocusable.
   */
  previouslyFocusedElement = 1
}

export interface IFocusTrapZone {
  /**
   * Sets focus on the first focusable, or configured, child in focus trap zone
   */
  focus: () => void;
}

export interface IFocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IFocusTrapZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IFocusTrapZone | null) => void;

  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @default The element.target that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;

  /**
   * Indicates if this Trap Zone will allow clicks outside the FocusTrapZone
   * @default false
   */
  isClickableOutsideFocusTrap?: boolean;

  /**
   * Indicates if this Trap Zone will ignore keeping track of HTMLElement that activated the Zone.
   * @default false
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Indicates whether focus trap zone should force focus inside the focus trap zone
   * @default true
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Indicates the selector for first focusable item.  Only applies if focusTransferRule == firstFocusable.
   */
  firstFocusableSelector?: string | (() => string);

  /**
   * Do not put focus onto first element when render focus trap zone
   * @default false
   */
  disableFirstFocus?: boolean;

  /**
   * If the FocusTrapZone is declared focusable (data-is-focusable=true) and it
   * receives focus directly, or if .focus() is called, it will pass on
   * focus to a child element.  This prop determines how that element is selected.
   * @default FocusTransferRule.firstFocusable
   */
  focusTransferRule?: FocusTransferRule;
}
