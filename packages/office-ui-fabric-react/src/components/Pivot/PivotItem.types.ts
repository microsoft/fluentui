import * as React from 'react';
import { IRenderFunction } from '../../Utilities';

export interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: () => void;

  /**
   * The text displayed of each pivot link.
   */
  linkText?: string;

  /**
   * An required key to uniquely identify a pivot item.
   *
   * Note: The 'key' from react props cannot be used inside component.
   */
  itemKey?: string;

  /**
   * The aria label of each pivot link which will read by screen reader instead of linkText.
   *
   * Note that unless you have compelling requirements you should not override aria-label.
   */
  ariaLabel?: string;

  /**
   * An optional item count that gets displayed just after the linkText(itemCount)
   *
   * Example: completed(4)
   */
  itemCount?: number;

  /**
   * An optional icon to show next to the pivot link.
   */
  itemIcon?: string;

  /**
   * Optional custom renderer for the pivot item link
   */
  onRenderItemLink?: IRenderFunction<IPivotItemProps>;
}