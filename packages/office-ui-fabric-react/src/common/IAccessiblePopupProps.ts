export interface IAccessiblePopupProps {
  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @default The element.target that triggered the Panel.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Indicates if this dialog will ignore keeping track of HTMLElement that activated the Zone.
   * @default false
   */
  ignoreExternalFocusing?: boolean;

  /**
  * Indicates whether dialog should force focus inside the focus trap zone
  * @default true
  */
  forceFocusInsideTrap?: boolean;

  /**
  * Indicates the selector for first focusable item
  */
  firstFocusableSelector?: string | (() => string);

  /**
  * Aria label on close button
  */
  closeButtonAriaLabel?: string;

  /**
  * Indicates if this dialog will allow clicks outside the FocusTrapZone
  * @default false
  */
  isClickableOutsideFocusTrap?: boolean;
}
