'use client';

import type * as React from 'react';
import { useToolbarToggleButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarToggleButtonProps, ToolbarToggleButtonState } from './ToolbarToggleButton.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a ToolbarToggleButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarToggleButton`.
 */
export const useToolbarToggleButton = (
  props: ToolbarToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarToggleButtonState => {
  const state: ToolbarToggleButtonState = useToolbarToggleButtonBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.checked);

  return state;
};
