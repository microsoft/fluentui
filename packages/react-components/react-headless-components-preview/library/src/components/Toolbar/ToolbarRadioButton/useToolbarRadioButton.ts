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

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = stringifyDataAttribute(state.checked);

  return state;
};
