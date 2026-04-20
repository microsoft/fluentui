'use client';

import type * as React from 'react';
import { useToggleButtonBase_unstable } from '@fluentui/react-button';

import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a ToggleButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToggleButton`.
 */
export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  'use no memo';

  const state: ToggleButtonState = useToggleButtonBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, iconOnly, and checked states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
