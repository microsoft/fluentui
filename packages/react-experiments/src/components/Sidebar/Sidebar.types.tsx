import * as React from 'react';
import { SidebarColors } from './Sidebar.styles';
import type { IButtonProps, IButtonStyles } from '@fluentui/react/lib/Button';
import type { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import type { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import type { IComponentAs, IRefObject } from '@fluentui/react/lib/Utilities';

export interface ISidebar {
  /**
   * Toggles the sidebar state to put the sidebar in or out of collapsed mode
   * @type {(boolean) => void}
   */
  toggleCollapsed: () => void;

  /**
   * Sets the sidebar in or out of collapsed mode
   * @type {(boolean) => void}
   */
  setCollapsed: (newValue: boolean) => void;

  /**
   * Gets the current collapsed state of the sidebar.
   * @type {() => boolean}
   */
  getCollapsed: () => boolean;
}

export interface ISidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ISidebar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   * @type {(component: ISidebar | null) => void}
   */
  componentRef?: IRefObject<ISidebar>;

  /**
   * Whether the Sidebar is collapsible or not. If it is, a collapsible button
   * is added to the top, and each element will render their onRenderCollapsed element.
   * @type {boolean}
   */
  collapsible?: boolean;

  /**
   * Callback for when the collapse state is toggled.
   * @type {() => void}
   */
  onCollapseChanged?: () => void;

  /**
   * Whether the Sidebar is collapsible or not. If it is, a collapsible button
   * is added to the top, and each element will render their onRenderCollapsed element.
   * @type {string}
   */
  collapseButtonAriaLabel?: string;

  /**
   * The items to be rendered at the bottom of the sidebar.
   * @type {ISidebarItemProps[]}
   */
  footerItems?: ISidebarItemProps[];

  /**
   * Items to render as children of this Sidebar Item.
   * @type {ISidebarItemProps[]}
   */
  items: ISidebarItemProps[];

  /**
   * Items to render as children of this Sidebar Item.
   * @type {ITheme}
   */
  theme?: ITheme;

  /**
   * Current colors for the sidebar. This will default to SidebarColors.Light if none is passed in.
   * @type {SidebarColors}
   */
  colors?: SidebarColors;

  /**
   * Custom styles to be applied to the sidebar.
   * @type {ISidebarStyles}
   */
  styles?: ISidebarStyles;

  /**
   * Custom styles to be applied to the collpase button if the sidebar is collapsible.
   * @type {IButtonStyles}
   */
  collapseButtonStyles?: IButtonStyles;

  /**
   * Custom styles to be applied to all sidebar items.
   * @type {IButtonStyles}
   */
  buttonStyles?: IButtonStyles;

  /**
   * Button to use for all sidebar items
   * @type {any}
   */
  defaultButton?: IComponentAs<IButtonProps>;
}

export interface ISidebarItemProps extends IContextualMenuItem {
  /**
   * Whether the item is currently the active page or not
   * @type {boolean}
   */
  active?: boolean;

  /**
   * Items to render as children of this Sidebar Item.
   * @type {ISidebarItemProps[]}
   */
  items?: ISidebarItemProps[];

  /**
   * Button to use for this sidebar item
   * @type {any}
   */
  buttonAs?: IComponentAs<IButtonProps>;
}

export interface ISidebarStyles {
  /**
   * Style for the root element
   */
  root?: IStyle;

  /**
   * Style for the root element when in the collapsed state
   */
  rootCollapsed?: IStyle;

  /**
   * Style for the content element
   */
  content?: IStyle;

  /**
   * Style for the content element when the sidebar is collapsed
   */
  contentCollapsed?: IStyle;

  /**
   * Style for the footer element
   */
  footer?: IStyle;
}

export const SidebarStylingConstants = {
  /**
   * The width of the sidebar when it is in the collapsed state
   */
  sidebarWidth: '220px',

  /**
   * The width of the sidebar when it is in the collapsed state
   */
  sidebarCollapsedWidth: '48px',

  /**
   * The width of the sidebar when it is in the collapsed state
   */
  sidebarIconSize: '16px',
};
