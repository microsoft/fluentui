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
   * Disables the FocusTrapZone's focus trapping behavior when set.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @defaultvalue element.target The element.target that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;

  /**
   * Indicates if this Trap Zone will allow clicks outside the FocusTrapZone
   * @defaultvalue false
   */
  isClickableOutsideFocusTrap?: boolean;

  /**
   * Indicates if this Trap Zone will ignore keeping track of HTMLElement that activated the Zone.
   * @defaultvalue false
   */
  ignoreExternalFocusing?: boolean;

  /**
   * Indicates whether focus trap zone should force focus inside the focus trap zone
   * @defaultvalue true
   */
  forceFocusInsideTrap?: boolean;

  /**
   * Class name for first focusable item (do not append a dot).
   * Only applies if `focusPreviouslyFocusedInnerElement` is false.
   */
  firstFocusableSelector?: string | (() => string);

  /**
   * Do not put focus onto first element when render focus trap zone
   * @defaultvalue false
   */
  disableFirstFocus?: boolean;

  /**
   * Specifies the algorithm used to determine which descendant element to focus when focus() is called.
   * If false, the first focusable descendant, filtered by the firstFocusableSelector property if present, is chosen.
   * If true, the element that was focused when the Trap Zone last had a focused descendant is chosen.
   * If it has never had a focused descendant before, behavior falls back to the first focused descendant.
   * @defaultvalue false
   */
  focusPreviouslyFocusedInnerElement?: boolean;
}
