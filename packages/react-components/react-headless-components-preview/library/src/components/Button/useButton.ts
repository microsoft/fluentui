'use client';

import type * as React from 'react';
import { useButtonBase_unstable } from '@fluentui/react-button';

import type { ButtonProps, ButtonState } from './Button.types';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a Button component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderButton`.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>): ButtonState => {
  const state: ButtonState = useButtonBase_unstable(props, ref);

  // Set data attributes for disabled, disabledFocusable, and iconOnly states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled'] = toDataAttributeValue(state.disabled);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-disabled-focusable'] = toDataAttributeValue(state.disabledFocusable);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-only'] = toDataAttributeValue(state.iconOnly);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-icon-position'] = state.icon ? state.iconPosition : undefined;

  return state;
};
