import * as React from 'react';
import { IRefObject, IRenderFunction } from '../../Utilities';
import { IKeytipProps } from '../../Keytip';

/**
 * {@docCategory Pivot}
 */
export interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * The text displayed of each pivot link - renaming to `headerText`.
   * @deprecated Use `headerText` instead.
   */
  linkText?: string;

  /**
   * The text displayed of each pivot link.
   */
  headerText?: string;

  /**
   * Props for the header command button supporting native props - data-* and aria-* - for each pivot header/link element
   */
  headerButtonProps?: { [key: string]: string | number | boolean };

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
   * Defines an optional item count displayed in parentheses just after the `linkText`.
   *
   * Examples: completed (4), Unread (99+)
   */
  itemCount?: number | string;

  /**
   * An optional icon to show next to the pivot link.
   */
  itemIcon?: string;

  /**
   * Optional custom renderer for the pivot item link
   */
  onRenderItemLink?: IRenderFunction<IPivotItemProps>;

  /**
   * Optional keytip for this PivotItem
   */
  keytipProps?: IKeytipProps;

  /**
   * A custom cache key to be used for this item. If `cacheKey` is changed, the cache will invalidate.
   * Defaults to `key` value.
   */
  cacheKey?: string;

  /**
   * Context under which the item is being rendered.
   * This value is mutated by the Pivot and is useful for adjusting the `onRender` function.
   */
  renderedInOverflow?: boolean;
}
