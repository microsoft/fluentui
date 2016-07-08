import * as React from 'react';

export interface IPivotItemProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * The text displayed of each pivot link.
   */
  linkText: string;

  /**
   * The aria label of each pivot link which will read by screen reader instead of linkText.
   *
   * Note that unless you have compelling requirements you should not override aria-label.
   */
  ariaLabel?: string;
}