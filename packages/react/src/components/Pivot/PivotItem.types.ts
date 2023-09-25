import * as React from 'react';
import type { IRefObject, IRenderFunction } from '@fluentui/utilities';
import type { IButtonProps } from '../../Button';
import type { IKeytipProps } from '../Keytip/Keytip.types';

/**
 * {@docCategory Pivot}
 */
export interface IPivotItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * The text displayed of each pivot link.
   * @deprecated Use `headerText` instead.
   */
  linkText?: string;

  /**
   * The text displayed of each pivot link.
   */
  headerText?: string;

  /**
   * Props for the header command button. This provides a way to pass in native props, such as data-* and aria-*,
   * for each pivot header/link element.
   */
  headerButtonProps?: IButtonProps | { [key: string]: string | number | boolean };

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
   * Defines whether to always render the pivot item (regardless of whether it is selected or not).
   * Useful if you're rendering content that is expensive to mount.
   *
   * @defaultvalue false
   */
  alwaysRender?: boolean;
}
