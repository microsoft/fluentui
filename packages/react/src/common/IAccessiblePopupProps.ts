/**
 * {@docCategory IAccessiblePopupProps}
 */
export interface IAccessiblePopupProps {
  /**
   * Sets the element to focus on when exiting the control's FocusTrapZone.
   * @defaultvalue The `element.target` that triggered the control opening.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * If false (the default), the control's FocusTrapZone will restore focus to the element which activated it
   * once the trap zone is unmounted or disabled. Set to true to disable this behavior.
   * @defaultvalue false
   */
  disableRestoreFocus?: boolean;

  /**
   * @deprecated Use `disableRestoreFocus` (it has the same behavior and a clearer name).
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Whether control should force focus inside its focus trap zone.
   * @defaultvalue true
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Class name (not actual selector) for first focusable item. Do not append a dot.
   */
  firstFocusableSelector?: string | (() => string);

  /**
   * Aria label on close button.
   */
  closeButtonAriaLabel?: string;

  /**
   * Whether this control will allow clicks outside its FocusTrapZone.
   * @defaultvalue false
   */
  isClickableOutsideFocusTrap?: boolean;
}
