import * as React from 'react';

export interface IFocusTrapZoneProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Sets the HTMLElement to focus on when exiting the FocusTrapZone.
   * @default: The element.target that triggered the FTZ.
   */
  elementToFocusOnDismiss?: HTMLElement;

  /**
   * Sets the aria-labelledby attribute.
   */
  ariaLabelledBy?: string;
}
