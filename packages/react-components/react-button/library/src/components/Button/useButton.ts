'use client';

import type * as React from 'react';
import { useButtonBase } from '@fluentui/react-headless-components-preview/button';
import { useButtonContext } from '../../contexts/ButtonContext';
import type { ButtonBaseProps, ButtonBaseState, ButtonProps, ButtonState } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonBase, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton_unstable = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonState => {
  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium', ...buttonProps } = props;
  const state = useButtonBase(buttonProps, ref);

  return {
    appearance,
    shape,
    size,
    ...state,
  };
};

/**
 * Base hook for Button component, which manages state related to slots structure and ARIA attributes.
 * Alias of the headless `useButtonBase`, kept so existing imports keep working.
 *
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButtonBase_unstable: (
  props: ButtonBaseProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => ButtonBaseState = useButtonBase;
