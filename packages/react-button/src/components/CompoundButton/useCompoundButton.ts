import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';
import { useButton } from '../Button/index';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButton = (
  { contentContainer, secondaryContent, ...props }: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): CompoundButtonState => {
  return {
    // Button state
    ...useButton(props, ref),

    // Slots definition
    components: {
      root: 'button',
      icon: 'span',
      contentContainer: 'span',
      secondaryContent: 'span',
    },
    contentContainer: resolveShorthand(contentContainer, { required: true }),
    secondaryContent: resolveShorthand(secondaryContent),
  };
};
