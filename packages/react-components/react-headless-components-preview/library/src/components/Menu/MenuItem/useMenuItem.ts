'use client';

import type * as React from 'react';
import { useMenuItemBase_unstable } from '@fluentui/react-menu';
import type { ARIAButtonElement } from '@fluentui/react-aria';

import type { MenuItemProps, MenuItemState } from './MenuItem.types';

/** Returns the state for a MenuItem; adds `focusgroupstart` so the focusgroup polyfill anchors the initial tab stop on the first item. */
export const useMenuItem = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  const state: MenuItemState = useMenuItemBase_unstable(props, ref);

  // eslint-disable-next-line react-compiler/react-compiler -- attribute is mutated to opt into the focusgroup polyfill.
  state.root.focusgroupstart = '';

  return state;
};
