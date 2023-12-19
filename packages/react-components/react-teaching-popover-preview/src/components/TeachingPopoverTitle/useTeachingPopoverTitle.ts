import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverTitleProps, TeachingPopoverTitleState } from './TeachingPopoverTitle.types';

/**
 * Create the state required to render TeachingPopoverTitle.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverTitleStyles_unstable,
 * before being passed to renderTeachingPopoverTitle_unstable.
 *
 * @param props - props from this instance of TeachingPopoverTitle
 * @param ref - reference to root HTMLDivElement of TeachingPopoverTitle
 */
export const useTeachingPopoverTitle_unstable = (
  props: TeachingPopoverTitleProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverTitleState => {
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
