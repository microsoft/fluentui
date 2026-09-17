'use client';

import * as React from 'react';
import type { MenuItemLinkProps, MenuItemProps } from '@fluentui/react-headless-components-preview/menu';

/**
 * Values a container publishes to the menu items it holds. The channel carries menu item props
 * rather than a bespoke shape, so a container may default any of them; items fold it in with
 * mergeContextProps, which keeps a local prop ahead of the container's and the consumer's own
 * className last.
 *
 * Both item props types are named because MenuItemLink is rooted on an anchor and MenuItem on a
 * div, so their element-level props differ; the intersection is the set every menu item accepts.
 *
 * No headless or Griffel counterpart exists to re-export, so unlike the button and link contexts
 * this one is declared here rather than forwarded.
 *
 * @internal
 */
export type MenuItemContextValue = Partial<MenuItemProps> & Partial<MenuItemLinkProps>;

const menuItemContext = React.createContext<MenuItemContextValue | undefined>(undefined);

const menuItemContextDefaultValue: MenuItemContextValue = {};

/** @internal */
export const MenuItemContextProvider = menuItemContext.Provider;

/** @internal */
export const useMenuItemContext = (): MenuItemContextValue =>
  React.useContext(menuItemContext) ?? menuItemContextDefaultValue;
