import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useButton_unstable } from '../Button/index';
import type { CompoundButtonProps, CompoundButtonState } from './CompoundButton.types';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButton_unstable = (
  { contentContainer, secondaryContent, ...props }: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): CompoundButtonState => {
  const state: CompoundButtonState = {
    // Button state
    ...useButton_unstable(props, ref),

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

  // Recalculate iconOnly to take into account secondaryContent.
  state.iconOnly = Boolean(state.icon?.children && !props.children && !state.secondaryContent?.children);

  return state;
};
