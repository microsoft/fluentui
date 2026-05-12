'use client';

import type * as React from 'react';
import { useToolbarRadioButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarRadioButtonProps, ToolbarRadioButtonState } from './ToolbarRadioButton.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ToolbarRadioButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarRadioButton`.
 */
export const useToolbarRadioButton = (
  props: ToolbarRadioButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarRadioButtonState => {
  'use no memo';

  const state: ToolbarRadioButtonState = useToolbarRadioButtonBase_unstable(props, ref);

  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
