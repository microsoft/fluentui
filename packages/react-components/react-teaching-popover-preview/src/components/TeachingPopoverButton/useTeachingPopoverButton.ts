import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverButtonProps, TeachingPopoverButtonState } from './TeachingPopoverButton.types';

/**
 * Create the state required to render TeachingPopoverButton.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverButtonStyles_unstable,
 * before being passed to renderTeachingPopoverButton_unstable.
 *
 * @param props - props from this instance of TeachingPopoverButton
 * @param ref - reference to root HTMLDivElement of TeachingPopoverButton
 */
export const useTeachingPopoverButton_unstable = (
  props: TeachingPopoverButtonProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverButtonState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
