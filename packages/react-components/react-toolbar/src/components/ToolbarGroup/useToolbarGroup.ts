import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import * as React from 'react';
import { ToolbarGroupProps, ToolbarGroupState } from './ToolbarGroup.types';

/**
 * Given user props, defines default props for the Group
 * @param props - User provided props to the Group component.
 * @param ref - User provided ref to be passed to the Group component.
 */
export const useToolbarGroup_unstable = (
  props: ToolbarGroupProps,
  ref: React.Ref<HTMLDivElement>,
): ToolbarGroupState => {
  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps<React.HTMLAttributes<HTMLDivElement>>('div', {
        ref,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
  };
};
