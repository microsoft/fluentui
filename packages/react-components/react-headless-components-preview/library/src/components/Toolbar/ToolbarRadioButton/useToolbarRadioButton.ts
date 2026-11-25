'use client';

import type * as React from 'react';
import { useToolbarRadioButtonBase_unstable } from '@fluentui/react-toolbar';

import type { ToolbarRadioButtonProps, ToolbarRadioButtonState } from './ToolbarRadioButton.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a ToolbarRadioButton component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarRadioButton`.
 */
export const useToolbarRadioButton = (
  props: ToolbarRadioButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarRadioButtonState => {
  const state: ToolbarRadioButtonState = useToolbarRadioButtonBase_unstable(props, ref);

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
