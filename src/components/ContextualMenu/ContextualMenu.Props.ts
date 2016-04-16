import * as React from 'react';
import ContextualMenu from './ContextualMenu';
import { IContextualMenuItem, DirectionalHint } from './interfaces';

export interface IContextualMenuProps extends React.Props<ContextualMenu> {
  /**
   * Collection of menu items
   */
  items: IContextualMenuItem[];

  /**
   * Element to anchor the ContextualMenu to.
   */
  targetElement?: HTMLElement;

  /**
   * Indicator of how the ContextualMenu should be anchored to its targetElement
   */
  directionalHint?: DirectionalHint;

  /**
   * TODO: Fill in comment
   */
  gapSpace?: number;

  /**
   * TODO: Fill in comment
   */
  labelElementId?: string;

  /**
   * Whether to focus on the menu when mounted
   */
  shouldFocusOnMount?: boolean;

  /**
   * Whether the beak should be visible
   */
  isBeakVisible?: boolean;

  /**
   * Callback when the ContextualMenu tries to close.
   */
  onDismiss?: (ev?: any) => void;

  /**
   * CSS class to apply to the context menu
   */
  className?: string;

  /**
   * Whether this menu is a submenu of another menu or not
   */
  isSubMenu?: boolean;
}
