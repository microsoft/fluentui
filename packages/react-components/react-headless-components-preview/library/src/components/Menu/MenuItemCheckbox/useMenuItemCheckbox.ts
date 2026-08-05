'use client';

import type * as React from 'react';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItemCheckboxBase_unstable } from '@fluentui/react-menu';
import { stringifyDataAttribute } from '../../../utils';
import { setMenuItemDataAttributes } from '../MenuItem/useMenuItem';
import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';

export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemCheckboxState => {
  const state: MenuItemCheckboxState = useMenuItemCheckboxBase_unstable(props, ref);

  setMenuItemDataAttributes(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
