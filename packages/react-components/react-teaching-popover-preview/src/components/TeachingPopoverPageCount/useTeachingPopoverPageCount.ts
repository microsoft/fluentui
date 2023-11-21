import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverPageCountProps, TeachingPopoverPageCountState } from './TeachingPopoverPageCount.types';

/**
 * Create the state required to render TeachingPopoverPageCount.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverPageCountStyles_unstable,
 * before being passed to renderTeachingPopoverPageCount_unstable.
 *
 * @param props - props from this instance of TeachingPopoverPageCount
 * @param ref - reference to root HTMLDivElement of TeachingPopoverPageCount
 */
export const useTeachingPopoverPageCount_unstable = (
  props: TeachingPopoverPageCountProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverPageCountState => {
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
