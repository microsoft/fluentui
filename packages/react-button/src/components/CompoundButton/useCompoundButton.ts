import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { CompoundButtonProps, CompoundButtonState, CompoundButtonRender } from './CompoundButton.types';
import { useButton_unstable } from '../Button/index';
import { renderCompoundButton_unstable } from './renderCompoundButton';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButton_unstable = (
  { contentContainer, secondaryContent, ...props }: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [CompoundButtonState, CompoundButtonRender] => {
  const [buttonState] = useButton_unstable(props, ref);
  const state: CompoundButtonState = {
    // Button state
    ...buttonState,

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
  return [state, renderCompoundButton_unstable];
};
