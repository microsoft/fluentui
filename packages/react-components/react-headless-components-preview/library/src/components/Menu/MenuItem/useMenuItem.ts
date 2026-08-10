'use client';

import type * as React from 'react';
import { useMenuItemBase_unstable } from '@fluentui/react-menu';
import type { ARIAButtonElement } from '@fluentui/react-aria';

import type { MenuItemProps, MenuItemState } from './MenuItem.types';
import { stringifyDataAttribute } from '../../../utils';

/** Returns the state for a MenuItem; adds `focusgroupstart` so the focusgroup polyfill anchors the initial tab stop on the first item. */
export const useMenuItem = (props: MenuItemProps, ref: React.Ref<ARIAButtonElement<'div'>>): MenuItemState => {
  const state: MenuItemState = useMenuItemBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability -- attribute is mutated to opt into the focusgroup polyfill.
  state.root.focusgroupstart = '';
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-has-submenu'] = stringifyDataAttribute(state.hasSubmenu);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-submenu-open'] = stringifyDataAttribute(state.submenuOpen);

  return state;
};
