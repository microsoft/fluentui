'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useButtonContext } from '../../contexts/ButtonContext';
import { useButtonBase_unstable } from '../Button/index';
import type {
  CompoundButtonBaseProps,
  CompoundButtonBaseState,
  CompoundButtonProps,
  CompoundButtonState,
} from './CompoundButton.types';

/**
 * Base hook for CompoundButton, which manages state related to slots structure and ARIA attributes.
 *
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButtonBase_unstable = (
  props: CompoundButtonBaseProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonBaseState => {
  const { contentContainer, secondaryContent, ...buttonProps } = props;
  const state: CompoundButtonBaseState = {
    ...useButtonBase_unstable(buttonProps, ref),
    components: {
      root: 'button',
      icon: 'span',
      contentContainer: 'span',
      secondaryContent: 'span',
    },
    contentContainer: slot.always(contentContainer, { elementType: 'span' }),
    secondaryContent: slot.optional(secondaryContent, { elementType: 'span' }),
  };

  state.iconOnly = Boolean(state.icon?.children && !props.children && !state.secondaryContent?.children);
  return state;
};

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
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium', ...buttonProps } = props;
  const state = useCompoundButtonBase_unstable(buttonProps, ref);

  return {
    appearance,
    shape,
    size,
    ...state,
  };
};
