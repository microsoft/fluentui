'use client';

import type * as React from 'react';
import { useButtonBase_unstable } from '@fluentui/react-button';

import type { ButtonProps, ButtonState } from './Button.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Button component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderButton`.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>): ButtonState => {
  'use no memo';

  const state: ButtonState = useButtonBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, and iconOnly states to simplify styling of these states.
  state.root['data-disabled'] = stringifyDataAttribute(state.disabled);
  state.root['data-disabled-focusable'] = stringifyDataAttribute(state.disabledFocusable);
  state.root['data-icon-only'] = stringifyDataAttribute(state.iconOnly);

  return state;
};
