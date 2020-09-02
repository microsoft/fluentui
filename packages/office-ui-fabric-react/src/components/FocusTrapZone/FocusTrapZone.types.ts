import * as React from 'react';
import { IRefObject } from '../../Utilities';

/**
 * {@docCategory FocusTrapZone}
 */
export interface IFocusTrapZone {
  /**
   * Sets focus to a descendant in the Trap Zone.
   * See firstFocusableSelector and focusPreviouslyFocusedInnerElement for details.
   */
  focus: () => void;
}

/**
 * {@docCategory FocusTrapZone}
 */
export interface IFocusTrapZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the IFocusTrapZone interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IFocusTrapZone>;

  /**
   * Whether to disable the FocusTrapZone's focus trapping behavior.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Sets the element to focus on when exiting the FocusTrapZone.
   * @defaultvalue The `element.target` that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;

  /**
   * Whether clicks are allowed outside this FocusTrapZone.
   * @defaultvalue false
   */
  isClickableOutsideFocusTrap?: boolean;

  /**
   * If false (the default), the trap zone will restore focus to the element which activated it
   * once the trap zone is unmounted or disabled. Set to true to disable this behavior.
   * @defaultvalue false
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Whether the focus trap zone should force focus to stay inside of it.
   * @defaultvalue true
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Class name (not actual selector) for first focusable item. Do not append a dot.
   * Only applies if `focusPreviouslyFocusedInnerElement` is false.
   */
  firstFocusableSelector?: string | (() => string);

  /**
   * Do not put focus onto the first element inside the focus trap zone.
   * @defaultvalue false
   */
  disableFirstFocus?: boolean;

  /**
   * Specifies which descendant element to focus when `focus()` is called.
   * If false, use the first focusable descendant, filtered by the `firstFocusableSelector` property if present.
   * If true, use the element that was focused when the trap zone last had a focused descendant
   * (or fall back to the first focusable descendant if the trap zone has never been focused).
   * @defaultvalue false
   */
  focusPreviouslyFocusedInnerElement?: boolean;

  /**
   * Puts aria-hidden=true on all non-ancestors of the current element, for screen readers.
   * This is an experimental feature that will be graduated to default behavior after testing.
   * This flag will be removed with the next major release.
   */
  enableAriaHiddenSiblings?: boolean;
}
