'use client';

import type * as React from 'react';
import { useToggleButtonBase_unstable } from '@fluentui/react-button';

import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a ToggleButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToggleButton`.
 */
export const useToggleButton = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  const state: ToggleButtonState = useToggleButtonBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, iconOnly, and checked states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.checked);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-position'] = state.icon ? state.iconPosition : undefined;

  return state;
};
