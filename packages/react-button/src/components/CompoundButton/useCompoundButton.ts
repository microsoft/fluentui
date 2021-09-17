import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { CompoundButtonProps, CompoundButtonSlots, CompoundButtonState } from './CompoundButton.types';
import { useButton } from '../Button/index';

/**
 * Consts listing which props are shorthand props.
 */
export const compoundButtonSlots: (keyof CompoundButtonSlots)[] = [
  'contentContainer',
  'icon',
  'secondaryContent',
  'root',
];

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
    ...useButton(props, ref),
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
