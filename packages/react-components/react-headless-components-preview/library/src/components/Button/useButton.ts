'use client';

import type * as React from 'react';
import { useButtonBase_unstable } from '@fluentui/react-button';

import type { ButtonProps, ButtonState } from './Button.types';
import { mapStateToDataAttributes } from '../../utils/mapStateToDataAttributes';

/**
 * Returns the state for a Button component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderButton`.
 */
export const useButton = (props: ButtonProps, ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>): ButtonState => {
  const state = useButtonBase_unstable(props, ref);

  Object.assign(state.root, mapStateToDataAttributes(state, ['disabled', 'disabledFocusable', 'iconOnly']));

  return state;
};
