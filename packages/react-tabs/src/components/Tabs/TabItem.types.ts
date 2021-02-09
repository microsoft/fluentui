import * as React from 'react';
import { IKeytipProps } from '@fluentui/react';
import { IButtonProps } from '@fluentui/react/lib/compat/Button';
import { IRefObject, IRenderFunction } from '@fluentui/utilities';

/**
 * {@docCategory Tabs}
 */
export interface TabItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Gets the component ref.
   */
  componentRef?: IRefObject<{}>;

  /**
   * The text displayed of each tab.
   */
  headerText?: string;

  /**
   * Props for the header command button. This provides a way to pass in native props, such as data-* and aria-*,
   * for each tab element.
   */
  headerButtonProps?: IButtonProps | { [key: string]: string | number | boolean };

  /**
   * An required key to uniquely identify a tab item.
   *
   * Note: The 'key' from react props cannot be used inside component.
   */
  itemKey?: string;

  /**
   * The aria label of each tab which will read by screen reader instead of headerText.
   *
   * Note that unless you have compelling requirements you should not override aria-label.
   */
  ariaLabel?: string;

  /**
   * Defines an optional item count displayed in parentheses just after the `headerText`.
   *
   * Examples: completed (4), Unread (99+)
   */
  itemCount?: number | string;

  /**
   * An optional icon to show next to the tab.
   */
  itemIcon?: string;

  /**
   * Optional custom renderer for the tab
   */
  onRenderTab?: IRenderFunction<TabItemProps>;

  /**
   * Optional keytip for this TabItem
   */
  keytipProps?: IKeytipProps;

  /**
   * Defines whether to always render the tab item (regardless of whether it is selected or not).
   * Useful if you're rendering content that is expensive to mount.
   *
   * @defaultvalue false
   */
  alwaysRender?: boolean;
}
