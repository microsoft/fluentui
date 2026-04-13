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
  const state = useButtonBase_unstable(props, ref);

  Object.assign(state.root, {
    'data-disabled': stringifyDataAttribute(state.disabled),
    'data-disabled-focusable': stringifyDataAttribute(state.disabledFocusable),
    'data-icon-only': stringifyDataAttribute(state.iconOnly),
  });

  return state;
};
