import * as React from 'react';

/**
 * {@docCategory Popup}
 */
export interface IPopupProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Aria role for popup
   */
  role?: string;

  /**
   * Accessible label text for the popup.
   */
  ariaLabel?: string;

  /**
   *  Defines the element id referencing the element containing label text for popup.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the popup.
   */
  ariaDescribedBy?: string;

  /**
   * A callback function for when the popup is dismissed from the close button or light dismiss. If provided, will
   * handle escape key press and call this. The event will be stopped/canceled.
   */
  onDismiss?: (ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement> | KeyboardEvent) => any;

  /**
   *  Optional class name for the root popup div.
   */
  className?: string;

  /**
   * If true, when this component is unmounted, focus will be restored to the element that had focus when the component
   * first mounted.
   * @defaultvalue true
   * @deprecated use restoreFocus callback instead
   */
  shouldRestoreFocus?: boolean;

  /**
   * Called when the component is unmounting, and focus needs to be restored. If this is provided,
   * focus will not be restored automatically, and you'll need to call `params.originalElement.focus()`.
   */
  onRestoreFocus?: (params: IPopupRestoreFocusParams) => void;

  /**
   * Puts aria-hidden=true on all non-ancestors of the current popup, for screen readers.
   * @defaultvalue true
   * @deprecated Setting this to `false` is deprecated since it breaks modal behavior for some screen readers.
   * It will not be supported in future versions of the library.
   */
  enableAriaHiddenSiblings?: boolean;
}

/**
 * Parameters passed to `onRestoreFocus` callback of `Popup` and related components.
 * {@docCategory Popup}
 */
export interface IPopupRestoreFocusParams {
  /** Element the underlying Popup believes focus should go to */
  originalElement?: HTMLElement | Window | null;
  /** Whether the popup currently contains focus */
  containsFocus: boolean;
  /** Whether the document the popup belongs to contains focus (or false if unknown) */
  documentContainsFocus: boolean;
}
