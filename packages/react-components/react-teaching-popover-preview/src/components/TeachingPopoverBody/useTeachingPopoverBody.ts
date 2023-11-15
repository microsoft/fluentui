import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverBodyProps, TeachingPopoverBodyState } from './TeachingPopoverBody.types';

/**
 * Create the state required to render TeachingPopoverBody.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverBodyStyles_unstable,
 * before being passed to renderTeachingPopoverBody_unstable.
 *
 * @param props - props from this instance of TeachingPopoverBody
 * @param ref - reference to root HTMLDivElement of TeachingPopoverBody
 */
export const useTeachingPopoverBody_unstable = (
  props: TeachingPopoverBodyProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverBodyState => {
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
