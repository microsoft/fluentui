'use client';

import * as React from 'react';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';
import { useCompoundButtonBase_unstable } from './useCompoundButtonBase';
import { useButtonContext } from '../../contexts';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButton_unstable = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonState => {
  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium' } = props;
  const state = useCompoundButtonBase_unstable(props, ref);

  return {
    appearance,
    size,
    shape,
    ...state,
  };
};
