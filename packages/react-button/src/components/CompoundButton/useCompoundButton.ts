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
 * Given user props, returns the final state for a CompoundButton.
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
