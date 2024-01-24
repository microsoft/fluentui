import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { TeachingPopoverActionsProps, TeachingPopoverActionsState } from './TeachingPopoverActions.types';

/**
 * Returns the props and state required to render the component
 * @param props - TeachingPopoverActions properties
 * @param ref - reference to root HTMLElement of TeachingPopoverActions
 */
export const useTeachingPopoverActions_unstable = (
  props: TeachingPopoverActionsProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverActionsState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
