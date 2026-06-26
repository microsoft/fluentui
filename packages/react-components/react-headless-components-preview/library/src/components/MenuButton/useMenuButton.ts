'use client';

import type * as React from 'react';
import { useMenuButtonBase_unstable } from '@fluentui/react-button';

import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a MenuButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderMenuButton`.
 */
export const useMenuButton = (
  props: MenuButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): MenuButtonState => {
  const state: MenuButtonState = useMenuButtonBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, and iconOnly states to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);

  return state;
};
