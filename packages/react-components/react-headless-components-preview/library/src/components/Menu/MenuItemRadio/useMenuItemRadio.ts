'use client';

import type * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItemRadioBase_unstable } from '@fluentui/react-menu';
import { stringifyDataAttribute } from '../../../utils';
import { setMenuItemDataAttributes } from '../MenuItem/useMenuItem';
import type { MenuItemRadioProps, MenuItemRadioState } from './MenuItemRadio.types';

export const useMenuItemRadio = (
  props: MenuItemRadioProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemRadioState => {
  const state: MenuItemRadioState = useMenuItemRadioBase_unstable(props, ref);

  setMenuItemDataAttributes(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
