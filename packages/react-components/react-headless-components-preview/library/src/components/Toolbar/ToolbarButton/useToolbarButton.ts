'use client';

import type * as React from 'react';
import { useToolbarButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a ToolbarButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarButton`.
 */
export const useToolbarButton = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonState => {
  const state: ToolbarButtonState = useToolbarButtonBase_unstable(props, ref);

  // Set data attributes for vertical, disabled, disabledFocusable, and iconOnly states to simplify styling.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-vertical'] = toDataAttributeValue(state.vertical);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);

  return state;
};
