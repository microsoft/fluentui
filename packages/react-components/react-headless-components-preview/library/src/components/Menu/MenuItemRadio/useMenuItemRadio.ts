'use client';

import type * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItemRadioBase_unstable } from '@fluentui/react-menu';
import { stringifyDataAttribute } from '../../../utils';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';

export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioState => {
  const state: MenuItemRadioState = useMenuItemRadioBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-has-submenu'] = stringifyDataAttribute(state.hasSubmenu);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-submenu-open'] = stringifyDataAttribute(state.submenuOpen);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
