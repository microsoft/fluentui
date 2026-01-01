'use client';

import * as React from 'react';
import { useButtonContext } from '../../contexts/ButtonContext';
import { useButtonBase_unstable } from './useButtonBase';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonBase_unstable, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton_unstable = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonState => {
  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium' } = props;
  const state = useButtonBase_unstable(props, ref);

  return {
    ...state,
    appearance,
    shape,
    size,
  };
};
