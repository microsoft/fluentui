'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useButtonBase_unstable } from '../Button/index';
import type { CompoundButtonBaseProps, CompoundButtonBaseState } from './CompoundButton.types';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButtonBase_unstable = (
  { contentContainer, secondaryContent, ...props }: CompoundButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonBaseState => {
  const state: CompoundButtonBaseState = {
    // Button state
    ...useButtonBase_unstable(props, ref),

    // Slots definition
    components: {
      root: 'button',
      icon: 'span',
      contentContainer: 'span',
      secondaryContent: 'span',
    },
    contentContainer: slot.always(contentContainer, { elementType: 'span' }),
    secondaryContent: slot.optional(secondaryContent, { elementType: 'span' }),
  };

  // Recalculate iconOnly to take into account secondaryContent.
  state.iconOnly = Boolean(state.icon?.children && !props.children && !state.secondaryContent?.children);

  return state;
};
