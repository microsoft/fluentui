import * as React from 'react';

export interface IFocusTrapZone {
  /**
  * Sets focus on the first focusable child in focus trap zone
  */
  focus: () => void;
}

export interface IFocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IFocusTrapZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IFocusTrapZone) => void;

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
  * Indicates the selector for first focusable item
  */
  firstFocusableSelector?: string;
}
