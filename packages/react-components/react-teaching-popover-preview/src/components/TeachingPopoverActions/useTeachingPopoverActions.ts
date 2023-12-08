import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverActionsProps, TeachingPopoverActionsState } from './TeachingPopoverActions.types';

/**
 * Create the state required to render TeachingPopoverActions.
 *
 * The returned state can be modified with hooks such as useTeachingPopoverActionsStyles_unstable,
 * before being passed to renderTeachingPopoverActions_unstable.
 *
 * @param props - props from this instance of TeachingPopoverActions
 * @param ref - reference to root HTMLDivElement of TeachingPopoverActions
 */
export const useTeachingPopoverActions_unstable = (
  props: TeachingPopoverActionsProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverActionsState => {
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
