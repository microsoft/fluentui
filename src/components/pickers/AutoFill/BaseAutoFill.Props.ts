import * as React from 'react';
import { BaseAutoFill } from './BaseAutoFill';

export interface IBaseAutoFillProps extends React.HTMLProps<HTMLInputElement | BaseAutoFill> {

  suggestedDisplayValue?: string;
  /**
 * The aria label of the button for the benefit of screen readers.
 */
  ariaLabel?: string;

  onInputValueChange?: (newValue?: string) => void;
  /**
   * Detailed description of the button for the benefit of screen readers.
   *
   * Besides the compound button, other button types will need more information provided to screen reader.
   */
  ariaDescription?: string;

  ariaActiveDescendant?: string;
  ariaOwns?: string;
  ariaExpanded?: string;
  ariaHasPopup?: string;
}