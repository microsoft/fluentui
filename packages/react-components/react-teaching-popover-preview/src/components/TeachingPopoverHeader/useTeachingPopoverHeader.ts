import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverHeaderProps, TeachingPopoverHeaderState } from './TeachingPopoverHeader.types';

/**
 * Create the state required to render TeachingPopoverHeader.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverHeaderStyles_unstable,
 * before being passed to renderTeachingPopoverHeader_unstable.
 *
 * @param props - props from this instance of TeachingPopoverHeader
 * @param ref - reference to root HTMLDivElement of TeachingPopoverHeader
 */
export const useTeachingPopoverHeader_unstable = (
  props: TeachingPopoverHeaderProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverHeaderState => {
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
