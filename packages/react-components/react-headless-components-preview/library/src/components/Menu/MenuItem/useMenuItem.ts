'use client';

import type * as React from 'react';
import { useMenuItemBase_unstable } from '@fluentui/react-menu';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import type { MenuItemProps, MenuItemState } from './MenuItem.types';

/**
 * Returns the state for a MenuItem.
 *
 * Delegates to v9's `useMenuItemBase_unstable`. The base hook applies
 * `role="menuitem"`, ARIA-button enhancement, character-search wiring, and
 * the click handler that closes the parent Menu. It does NOT inject the
 * default chevron icon (that lives in the styled `useMenuItem_unstable`),
 * so headless consumers can supply their own submenu indicator slot.
 */
export const useMenuItem = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  return useMenuItemBase_unstable(props, ref);
};
