'use client';

import type * as React from 'react';
import { useMenuItemLinkBase_unstable } from '@fluentui/react-menu';
import type { MenuItemLinkProps, MenuItemLinkState } from './MenuItemLink.types';

/**
 * Returns the state for a MenuItemLink.
 *
 * Delegates to v9's `useMenuItemLinkBase_unstable`. Renders an `<a>` root
 * with `role="menuitem"` and the supplied `href`. No default icon injection.
 */
export const useMenuItemLink = (props: MenuItemLinkProps, ref: React.Ref<HTMLAnchorElement>): MenuItemLinkState => {
  return useMenuItemLinkBase_unstable(props, ref);
};
