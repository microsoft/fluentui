'use client';

import type * as React from 'react';
import { useToolbarButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ToolbarButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarButton`.
 */
export const useToolbarButton = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonState => {
  'use no memo';

  const state: ToolbarButtonState = useToolbarButtonBase_unstable(props, ref);

  // Set data attributes for vertical, disabled, disabledFocusable, and iconOnly states to simplify styling.
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);

  return state;
};
