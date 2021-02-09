import * as React from 'react';
import { IStyle, ITheme } from '@fluentui/style-utilities';
import { IStyleFunctionOrObject } from '@fluentui/utilities';
import { TabItem } from './TabItem';

/**
 * {@docCategory Tabs}
 */
export interface TabsImperativeHandle {
  /**
   * Sets focus to the first tab.
   */
  focus(): void;
}

/**
 * {@docCategory Tabs}
 */
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the TabsImperativeHandle interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<TabsImperativeHandle>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<TabsStyleProps, TabsStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Additional css class to apply to the Tabs
   * @defaultvalue undefined
   */
  className?: string;

  /**
   * Default selected TabItem key. Only provide this if the Tabs is an uncontrolled component;
   * otherwise, use the `selectedKey` property.
   */
  defaultSelectedKey?: string;

  /**
   * Key of the selected tab item. Updating this will override the selected tab state.
   * Only provide this if the Tabs is a controlled component where you are maintaining the
   * current state; otherwise, use `defaultSelectedKey`.
   */
  selectedKey?: string | null;

  /**
   * Callback for when the selected tab item is changed.
   */
  onTabClick?: (item?: TabItem, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Tab size (normal, large)
   */
  tabSize?: TabSizeType;

  /**
   * Tab format (links, tabs)
   */
  tabFormat?: TabFormatType;

  /**
   * Overflow behavior when there is not enough room to display all of the tabs
   * * none: Tabs will overflow the container and may not be visible
   * * menu: Display an overflow menu that contains the tabs that don't fit
   *
   * @default none
   */
  overflowBehavior?: 'none' | 'menu';

  /**
   * Whether to skip rendering the tabpanel with the content of the selected tab.
   * Use this prop if you plan to separately render the tab content
   * and don't want to leave an empty tabpanel in the page that may confuse Screen Readers.
   */
  headersOnly?: boolean;

  /**
   * Callback to customize how IDs are generated for each tab header.
   * Useful if you're rendering content outside and need to connect aria-labelledby.
   */
  getTabId?: (itemKey: string, index: number) => string;
}

/**
 * {@docCategory Tabs}
 */
export type TabsStyleProps = Required<Pick<TabsProps, 'theme'>> &
  Pick<TabsProps, 'className'> & {
    tabSize?: TabSizeType;
    tabFormat?: TabFormatType;
  };

/**
 * {@docCategory Tabs}
 */
export interface TabsStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  tab: IStyle;
  tabIsSelected: IStyle;
  tabContent: IStyle;
  text: IStyle;
  count: IStyle;
  icon: IStyle;
  tabInMenu: IStyle;
  overflowMenuButton: IStyle;
  itemContainer?: IStyle;
}

/**
 * {@docCategory Tabs}
 * Display mode for the tabs
 */
export type TabFormatType = 'links' | 'tabs';

/**
 * {@docCategory Tabs}
 * Size of the tabs
 */
export type TabSizeType = 'normal' | 'large';
