'use client';

import type * as React from 'react';
import { useToolbarToggleButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarToggleButtonProps, ToolbarToggleButtonState } from './ToolbarToggleButton.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ToolbarToggleButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarToggleButton`.
 */
export const useToolbarToggleButton = (
  props: ToolbarToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarToggleButtonState => {
  'use no memo';

  const state: ToolbarToggleButtonState = useToolbarToggleButtonBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
