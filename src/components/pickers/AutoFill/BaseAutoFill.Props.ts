import * as React from 'react';
import { BaseAutoFill } from './BaseAutoFill';

export interface IBaseAutoFillProps extends React.HTMLProps<HTMLInputElement | BaseAutoFill> {
  /**
   * The suggested autofill value that will display.
   */
  suggestedDisplayValue?: string;
  /**
   * A callback for when the current input value changes.
   */
  onInputValueChange?: (newValue?: string) => void;
  /**
   * Corresponds to aria-description for screen readers.
   */
  ariaDescription?: string;

  /**
   * Corresponds to aria-label for screen readers.
   */
  ariaLabel?: string;
  /**
   * Corresponds to aria-activedescendant for screen readers.
   */
  ariaActiveDescendant?: string;
  /**
   * Corresponds to aria-owns for screen readers.
   */
  ariaOwns?: string;
  /**
   * Corresponds to aria-expanded for screen readers.
   */
  ariaExpanded?: string;
  /**
   * Corresponds to aria-haspopup for screen readers.
   */
  ariaHasPopup?: string;
}